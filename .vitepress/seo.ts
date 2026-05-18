import type { HeadConfig, PageData } from 'vitepress'

export const siteOrigin = 'https://docs.mincemeat.id'
export const siteDescription =
  'User documentation for Mincemeat: account, cloud instances, static sites, and custom domains.'
export const defaultOgImage = '/og/home.svg'
export const launchLocale = 'en-US'

const pageLabels: Record<string, string> = {
  account: 'Account',
  contributing: 'Contribute',
  domains: 'Domains',
  'get-started': 'Get Started',
  instances: 'Instances',
  'static-sites': 'Static Sites',
  troubleshooting: 'Troubleshooting',
}

export function pagePathFromRelativePath(relativePath: string): string {
  if (relativePath === 'index.md') {
    return '/'
  }

  if (relativePath === '404.md') {
    return '/404'
  }

  return `/${relativePath}`
    .replace(/\/index\.md$/, '/')
    .replace(/\.md$/, '')
}

export function absoluteUrl(path: string): string {
  if (path.startsWith('https://')) {
    return path
  }

  return `${siteOrigin}${path.startsWith('/') ? path : `/${path}`}`
}

export function canonicalUrl(relativePath: string): string {
  return absoluteUrl(pagePathFromRelativePath(relativePath))
}

export function normalizeSitemapUrl(url: string): string {
  return url.replace('https://mincemeat.id', siteOrigin)
}

export function withSeoFrontmatter(pageData: PageData): Partial<PageData> {
  const frontmatter = {
    locale: launchLocale,
    canonicalLocale: launchLocale,
    translationKey:
      pageData.frontmatter.translationKey ||
      pagePathFromRelativePath(pageData.relativePath),
    ...pageData.frontmatter,
    canonicalUrl: canonicalUrl(pageData.relativePath),
    head: [],
  }

  return { frontmatter }
}

export function buildSeoHead(pageData: PageData): HeadConfig[] {
  const path = pagePathFromRelativePath(pageData.relativePath)
  const frontmatter = pageData.frontmatter
  const description = pageData.description || siteDescription
  const canonical = frontmatter.canonicalUrl || canonicalUrl(pageData.relativePath)
  const image = absoluteUrl(frontmatter.ogImage || frontmatter.image || defaultOgImage)
  const ogTitle = frontmatter.ogTitle || readableSocialTitle(pageData.title, path)
  const robots = pageData.isNotFound || path === '/404' ? 'noindex,follow' : 'index,follow'

  return [
    ['link', { rel: 'canonical', href: canonical }],
    ['meta', { name: 'description', content: description }],
    ['meta', { name: 'robots', content: robots }],
    ['meta', { property: 'og:locale', content: frontmatter.locale || launchLocale }],
    ['meta', { property: 'og:site_name', content: 'Mincemeat Docs' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: canonical }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: ogTitle }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: image }],
  ]
}

export function buildAnalyticsHead(env: NodeJS.ProcessEnv = process.env): HeadConfig[] {
  if (env.MINCEMEAT_ANALYTICS_PRIVACY_REVIEWED !== 'true') {
    return []
  }

  const provider = env.MINCEMEAT_ANALYTICS_PROVIDER?.toLowerCase()

  if (provider === 'plausible' && env.MINCEMEAT_ANALYTICS_SRC && env.MINCEMEAT_ANALYTICS_DOMAIN) {
    return [
      [
        'script',
        {
          defer: '',
          'data-domain': env.MINCEMEAT_ANALYTICS_DOMAIN,
          src: env.MINCEMEAT_ANALYTICS_SRC,
        },
      ],
    ]
  }

  return []
}

export { pageLabels }

function readableSocialTitle(title: string, path: string): string {
  if (path === '/' || title.toLowerCase().includes('mincemeat')) {
    return title
  }

  return `${title} | Mincemeat Docs`
}
