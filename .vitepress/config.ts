import { defineConfig } from 'vitepress'
import {
  buildAnalyticsHead,
  buildSeoHead,
  defaultOgImage,
  launchLocale,
  normalizeSitemapUrl,
  siteDescription,
  siteOrigin,
  withSeoFrontmatter,
} from './seo'

export default defineConfig({
  title: 'Mincemeat Docs',
  titleTemplate: ':title | Mincemeat Docs',
  description: siteDescription,
  lang: launchLocale,
  cleanUrls: true,
  appearance: true,
  lastUpdated: true,
  srcExclude: ['README.md', 'documentation_design.md'],
  sitemap: {
    hostname: siteOrigin,
    transformItems(items) {
      return items
        .filter((item) => item.url !== '404' && !item.url.endsWith('/404'))
        .map((item) => ({
          ...item,
          url: normalizeSitemapUrl(item.url),
        }))
    },
  },
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600&family=IBM+Plex+Mono:wght@400;600&display=swap',
        rel: 'stylesheet',
      },
    ],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#0f62fe' }],
    ['meta', { property: 'og:site_name', content: 'Mincemeat Docs' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Mincemeat Docs' }],
    ['meta', { property: 'og:description', content: siteDescription }],
    ['meta', { property: 'og:url', content: siteOrigin }],
    ['meta', { property: 'og:image', content: `${siteOrigin}${defaultOgImage}` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Mincemeat Docs' }],
    ['meta', { name: 'twitter:description', content: siteDescription }],
    ['meta', { name: 'twitter:image', content: `${siteOrigin}${defaultOgImage}` }],
    ['meta', { name: 'robots', content: 'index,follow' }],
  ],
  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'Mincemeat Docs',
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Get Started', link: '/get-started/' },
      { text: 'Account', link: '/account/' },
      { text: 'Instances', link: '/instances/' },
      { text: 'Static Sites', link: '/static-sites/' },
      { text: 'Domains', link: '/domains/' },
      { text: 'Troubleshooting', link: '/troubleshooting/' },
      { text: 'Contribute', link: '/contributing/' },
    ],
    sidebar: {},
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mincemeat-id/documentation' },
    ],
    editLink: {
      pattern:
        'https://github.com/mincemeat-id/documentation/edit/main/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message:
        'Documentation content licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. Site code licensed under <a href="https://opensource.org/licenses/MIT">MIT</a>.',
      copyright: `Copyright © ${new Date().getFullYear()} Mincemeat`,
    },
  },
  transformPageData(pageData) {
    return withSeoFrontmatter(pageData)
  },
  transformHead(context) {
    return [...buildSeoHead(context.pageData), ...buildAnalyticsHead()]
  },
})
