#!/usr/bin/env node
// Lightweight link guardrail for the public docs repository.
//
// This check is intentionally focused: it scans tracked Markdown for
// link patterns that should never appear on a public documentation
// site. Broken external links are out of scope for this check; that is
// handled by the production build and preview deploy.
//
// It fails the build if any tracked Markdown file references:
//   - private GitHub repositories owned by mincemeat-id (anything not
//     listed in ALLOWED_PUBLIC_REPOS),
//   - localhost or 127.0.0.1 URLs outside fenced code blocks,
//   - private/internal hostnames (.internal, .local, .lan, 10.*, 192.168.*),
//   - explicit "TODO link" / "FIXME link" markers.

import { readFileSync, statSync } from 'node:fs'
import { execSync } from 'node:child_process'
import path from 'node:path'

const ALLOWED_PUBLIC_REPOS = new Set([
  'mincemeat-id/documentation',
])

const PRIVATE_HOST_PATTERNS = [
  /\bhttps?:\/\/[^\s)]+\.internal\b/gi,
  /\bhttps?:\/\/[^\s)]+\.local\b/gi,
  /\bhttps?:\/\/[^\s)]+\.lan\b/gi,
  /\bhttps?:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g,
  /\bhttps?:\/\/192\.168\.\d{1,3}\.\d{1,3}\b/g,
  /\bhttps?:\/\/172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}\b/g,
]

const LOCALHOST_PATTERN = /\bhttps?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/[^\s)]*)?/gi
const GITHUB_REPO_PATTERN = /\bhttps?:\/\/github\.com\/([\w.-]+\/[\w.-]+)/gi
const TODO_LINK_PATTERN = /\b(TODO|FIXME)\s+link\b/gi

const repoRoot = process.cwd()

function listTrackedMarkdown() {
  const output = execSync('git ls-files -- "*.md"', { encoding: 'utf8' })
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((file) => {
      try {
        return statSync(path.join(repoRoot, file)).isFile()
      } catch {
        return false
      }
    })
}

function stripFencedCodeBlocks(source) {
  return source.replace(/```[\s\S]*?```/g, '')
}

function stripInlineCode(source) {
  // Inline code spans are wrapped in single backticks. Strip them so
  // that example URLs in inline code (for example, the dev server URL
  // documented in contributing/local-development.md) don't trip the
  // localhost or marker checks.
  return source.replace(/`[^`\n]+`/g, '')
}

function checkFile(file) {
  const fullPath = path.join(repoRoot, file)
  const raw = readFileSync(fullPath, 'utf8')
  const text = stripInlineCode(stripFencedCodeBlocks(raw))
  const issues = []

  for (const match of text.matchAll(LOCALHOST_PATTERN)) {
    issues.push(`localhost URL not allowed: ${match[0]}`)
  }

  for (const pattern of PRIVATE_HOST_PATTERNS) {
    for (const match of text.matchAll(pattern)) {
      issues.push(`private host URL not allowed: ${match[0]}`)
    }
  }

  for (const match of text.matchAll(GITHUB_REPO_PATTERN)) {
    const repo = match[1].replace(/\.git$/, '')
    const [owner] = repo.split('/')

    if (owner.toLowerCase() === 'mincemeat-id' && !ALLOWED_PUBLIC_REPOS.has(repo)) {
      issues.push(`unapproved mincemeat-id repository link: ${match[0]}`)
    }
  }

  for (const match of text.matchAll(TODO_LINK_PATTERN)) {
    issues.push(`unresolved link marker: ${match[0]}`)
  }

  return issues
}

function main() {
  const files = listTrackedMarkdown()
  let failed = false

  for (const file of files) {
    const issues = checkFile(file)

    if (issues.length > 0) {
      failed = true
      console.error(`\n${file}`)

      for (const issue of issues) {
        console.error(`  - ${issue}`)
      }
    }
  }

  if (failed) {
    console.error('\nLink check failed. Please address the issues above.')
    process.exit(1)
  }

  console.log(`Link check passed: scanned ${files.length} Markdown file(s).`)
}

main()
