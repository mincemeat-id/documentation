#!/usr/bin/env node
// Frontmatter standard checker for the Mincemeat documentation
// repository.
//
// Every tracked Markdown documentation page must declare:
//   - title       (string, 1-80 chars)
//   - description (string, 40-200 chars)
//   - category    (one of the documented section slugs)
//   - audience    ('user' or 'contributor')
//   - updated     (ISO date, YYYY-MM-DD)
//
// Optional fields: related (array of strings), head, aside, outline,
// layout, hero, features.
//
// Top-level repository files (README, CONTRIBUTING, SECURITY, 404,
// LICENSE notes, and the design doc) are excluded; they are not user
// documentation pages.

import { readFileSync, statSync } from 'node:fs'
import { execSync } from 'node:child_process'
import path from 'node:path'

const ALLOWED_CATEGORIES = new Set([
  'get-started',
  'account',
  'instances',
  'static-sites',
  'domains',
  'troubleshooting',
  'contributing',
])

const ALLOWED_AUDIENCES = new Set(['user', 'contributor'])

const ALLOWED_FIELDS = new Set([
  'title',
  'description',
  'category',
  'audience',
  'updated',
  'related',
  'head',
  'aside',
  'outline',
  // VitePress home/landing fields, allowed only on index.md / home pages
  'layout',
  'hero',
  'features',
])

const EXCLUDED_FILES = new Set([
  'README.md',
  'CONTRIBUTING.md',
  'SECURITY.md',
  'LICENSE',
  'LICENSE-CONTENT',
  '404.md',
  'documentation_design.md',
  'index.md', // home page uses the VitePress home layout
])

const EXCLUDED_PREFIXES = ['.github/', 'node_modules/', '.vitepress/dist/']

const repoRoot = process.cwd()

function listTrackedMarkdown() {
  const output = execSync('git ls-files -- "*.md"', { encoding: 'utf8' })
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((file) => {
      if (EXCLUDED_FILES.has(file)) return false
      if (EXCLUDED_PREFIXES.some((p) => file.startsWith(p))) return false
      try {
        return statSync(path.join(repoRoot, file)).isFile()
      } catch {
        return false
      }
    })
}

function extractFrontmatter(raw) {
  // Expect frontmatter delimited by `---` on the first line.
  if (!raw.startsWith('---')) return null
  const end = raw.indexOf('\n---', 3)
  if (end === -1) return null
  return raw.slice(4, end)
}

function parseFrontmatter(block) {
  // Very small YAML subset parser: supports `key: value`, quoted
  // values, and list items prefixed by `  - `. Sufficient for the
  // fields we standardise on.
  const result = {}
  const lines = block.split('\n')
  let currentKey = null
  let currentList = null

  for (const line of lines) {
    if (!line.trim()) continue

    const listMatch = line.match(/^\s+-\s+(.*)$/)
    if (listMatch && currentList) {
      currentList.push(stripQuotes(listMatch[1].trim()))
      continue
    }

    const keyMatch = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/)
    if (!keyMatch) continue

    const key = keyMatch[1]
    const value = keyMatch[2]

    if (value === '') {
      // Either a mapping or a list follows
      currentKey = key
      currentList = []
      result[key] = currentList
    } else {
      currentKey = key
      currentList = null
      result[key] = stripQuotes(value.trim())
    }
  }

  // If a key was declared as an empty mapping but the next lines were
  // not list items, the value should be `{}` rather than `[]`. We do
  // not need to distinguish for the fields we validate.
  void currentKey
  return result
}

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }
  return value
}

function inferCategoryFromPath(file) {
  const [top] = file.split('/')
  if (ALLOWED_CATEGORIES.has(top)) return top
  return null
}

function checkFile(file) {
  const fullPath = path.join(repoRoot, file)
  const raw = readFileSync(fullPath, 'utf8')
  const issues = []

  const block = extractFrontmatter(raw)
  if (block === null) {
    issues.push('missing frontmatter block (expected `---` at top of file)')
    return issues
  }

  const fm = parseFrontmatter(block)

  for (const key of Object.keys(fm)) {
    if (!ALLOWED_FIELDS.has(key)) {
      issues.push(`unknown frontmatter field: \`${key}\``)
    }
  }

  // title
  if (!fm.title || typeof fm.title !== 'string') {
    issues.push('missing required field: `title`')
  } else if (fm.title.length < 1 || fm.title.length > 80) {
    issues.push(`field \`title\` must be 1-80 characters (got ${fm.title.length})`)
  }

  // description
  if (!fm.description || typeof fm.description !== 'string') {
    issues.push('missing required field: `description`')
  } else if (fm.description.length < 40 || fm.description.length > 200) {
    issues.push(
      `field \`description\` must be 40-200 characters (got ${fm.description.length})`,
    )
  }

  // category
  if (!fm.category) {
    issues.push('missing required field: `category`')
  } else if (!ALLOWED_CATEGORIES.has(fm.category)) {
    issues.push(
      `field \`category\` must be one of: ${[...ALLOWED_CATEGORIES].join(', ')} (got "${fm.category}")`,
    )
  } else {
    const inferred = inferCategoryFromPath(file)
    if (inferred && inferred !== fm.category) {
      issues.push(
        `field \`category\` ("${fm.category}") does not match folder ("${inferred}")`,
      )
    }
  }

  // audience
  if (!fm.audience) {
    issues.push('missing required field: `audience`')
  } else if (!ALLOWED_AUDIENCES.has(fm.audience)) {
    issues.push(
      `field \`audience\` must be one of: ${[...ALLOWED_AUDIENCES].join(', ')} (got "${fm.audience}")`,
    )
  }

  // updated
  if (!fm.updated) {
    issues.push('missing required field: `updated`')
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(fm.updated)) {
    issues.push(`field \`updated\` must be ISO date YYYY-MM-DD (got "${fm.updated}")`)
  } else {
    const parsed = new Date(fm.updated)
    if (Number.isNaN(parsed.getTime())) {
      issues.push(`field \`updated\` is not a real date (got "${fm.updated}")`)
    }
  }

  // related (optional)
  if (fm.related !== undefined) {
    if (!Array.isArray(fm.related)) {
      issues.push('field `related` must be a list of site-relative paths')
    } else {
      for (const entry of fm.related) {
        if (typeof entry !== 'string' || !entry.startsWith('/')) {
          issues.push(`field \`related\` entry must be a site-relative path: "${entry}"`)
        }
      }
    }
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
    console.error('\nFrontmatter check failed. Please address the issues above.')
    process.exit(1)
  }

  console.log(`Frontmatter check passed: scanned ${files.length} Markdown file(s).`)
}

main()
