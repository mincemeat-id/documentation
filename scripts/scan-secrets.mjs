#!/usr/bin/env node
// Local secret-shape scanner used as a developer guardrail.
//
// This is a fast, dependency-free check that runs locally and in CI as a
// first line of defense. The CI workflow ALSO runs gitleaks against the
// full repository history; the two checks are complementary.
//
// It looks for common secret shapes in tracked text files and fails if
// any match is found. False positives can be resolved by:
//   - removing the value (preferred),
//   - or adding a comment with the marker `secret-scan: allow` on the
//     same line for documented, non-secret example values.

import { readFileSync, statSync } from 'node:fs'
import { execSync } from 'node:child_process'
import path from 'node:path'

const ALLOW_MARKER = 'secret-scan: allow'

const PATTERNS = [
  { name: 'AWS Access Key ID', regex: /\bAKIA[0-9A-Z]{16}\b/g },
  { name: 'AWS Secret Access Key', regex: /\b(?<![A-Za-z0-9])[A-Za-z0-9/+]{40}(?![A-Za-z0-9])\b/g, contextOnly: true },
  { name: 'GitHub personal token', regex: /\bghp_[A-Za-z0-9]{30,}\b/g },
  { name: 'GitHub OAuth token', regex: /\bgho_[A-Za-z0-9]{30,}\b/g },
  { name: 'GitHub App token', regex: /\b(ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b/g },
  { name: 'GitHub fine-grained token', regex: /\bgithub_pat_[A-Za-z0-9_]{40,}\b/g },
  { name: 'Slack token', regex: /\bxox[abprs]-[A-Za-z0-9-]{10,}\b/g },
  { name: 'Google API key', regex: /\bAIza[0-9A-Za-z_-]{35}\b/g },
  { name: 'Stripe live key', regex: /\b(sk|rk)_live_[0-9A-Za-z]{16,}\b/g },
  { name: 'Generic JWT', regex: /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/g },
  { name: 'PEM private key', regex: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/g },
  { name: 'High-entropy password assignment', regex: /\b(password|passwd|secret|api[_-]?key|token)\s*[:=]\s*["'][^"'\s]{12,}["']/gi },
]

const CONTEXT_HINTS = /(aws|amazon|s3|secret|key)/i

const TEXT_EXTENSIONS = new Set([
  '.md', '.mdx', '.txt',
  '.ts', '.tsx', '.js', '.mjs', '.cjs',
  '.vue', '.json', '.yml', '.yaml', '.toml',
  '.html', '.css', '.scss', '.sh', '.env',
])

const repoRoot = process.cwd()

function listTrackedFiles() {
  const output = execSync('git ls-files', { encoding: 'utf8' })
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((file) => {
      const ext = path.extname(file).toLowerCase()
      const base = path.basename(file).toLowerCase()

      if (base === 'lock.json' || base === 'package-lock.json' || base === 'pnpm-lock.yaml') {
        return false
      }

      if (ext === '' && !base.startsWith('.')) {
        return false
      }

      if (ext === '' || TEXT_EXTENSIONS.has(ext) || base.startsWith('.env')) {
        try {
          return statSync(path.join(repoRoot, file)).isFile()
        } catch {
          return false
        }
      }

      return false
    })
}

function lineNumberOf(source, index) {
  return source.slice(0, index).split('\n').length
}

function checkFile(file) {
  const fullPath = path.join(repoRoot, file)
  let raw

  try {
    raw = readFileSync(fullPath, 'utf8')
  } catch {
    return []
  }

  const lines = raw.split('\n')
  const findings = []

  for (const { name, regex, contextOnly } of PATTERNS) {
    const re = new RegExp(regex.source, regex.flags)
    let match

    while ((match = re.exec(raw)) !== null) {
      const lineNumber = lineNumberOf(raw, match.index)
      const line = lines[lineNumber - 1] || ''

      if (line.includes(ALLOW_MARKER)) {
        continue
      }

      if (contextOnly && !CONTEXT_HINTS.test(line)) {
        continue
      }

      findings.push({
        name,
        lineNumber,
        snippet: line.trim().slice(0, 160),
      })
    }
  }

  return findings
}

function main() {
  const files = listTrackedFiles()
  let failed = false

  for (const file of files) {
    const findings = checkFile(file)

    if (findings.length > 0) {
      failed = true
      console.error(`\n${file}`)

      for (const finding of findings) {
        console.error(`  - L${finding.lineNumber}: ${finding.name}`)
        console.error(`      ${finding.snippet}`)
      }
    }
  }

  if (failed) {
    console.error('\nSecret scan failed. Remove the value, or add `secret-scan: allow` if it is documented as a non-secret example.')
    process.exit(1)
  }

  console.log(`Secret scan passed: scanned ${files.length} file(s).`)
}

main()
