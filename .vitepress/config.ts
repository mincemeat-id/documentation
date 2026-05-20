import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'
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
  vite: {
    plugins: [
      llmstxt({
        domain: siteOrigin,
        title: 'Mincemeat Docs',
        description: siteDescription,
        ignoreFiles: [
          'README.md',
          'CONTRIBUTING.md',
          'SECURITY.md',
          'AGENTS.md',
          'documentation_design.md',
        ],
      }),
    ],
  },
  title: 'Mincemeat Docs',
  titleTemplate: ':title | Mincemeat Docs',
  description: siteDescription,
  lang: launchLocale,
  cleanUrls: true,
  appearance: true,
  lastUpdated: true,
  srcExclude: [
    'README.md',
    'CONTRIBUTING.md',
    'SECURITY.md',
    'AGENTS.md',
    'documentation_design.md',
  ],
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
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap',
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
      options: {
        translations: {
          button: {
            buttonText: 'Search docs',
            buttonAriaLabel: 'Search Mincemeat documentation',
          },
          modal: {
            displayDetails: 'Show details',
            resetButtonTitle: 'Clear search',
            backButtonTitle: 'Close search',
            noResultsText: 'No results for',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close',
            },
          },
        },
      },
    },
    nav: [
      { text: 'Get Started', link: '/get-started/', activeMatch: '/get-started/' },
      { text: 'Account', link: '/account/', activeMatch: '/account/' },
      { text: 'Instances', link: '/instances/', activeMatch: '/instances/' },
      { text: 'Static Sites', link: '/static-sites/', activeMatch: '/static-sites/' },
      { text: 'Domains', link: '/domains/', activeMatch: '/domains/' },
      { text: 'Troubleshooting', link: '/troubleshooting/', activeMatch: '/troubleshooting/' },
      { text: 'Contribute', link: '/contributing/', activeMatch: '/contributing/' },
    ],
    outline: {
      level: [2, 3],
      label: 'On this page',
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },
    darkModeSwitchLabel: 'Theme',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme',
    returnToTopLabel: 'Return to top',
    sidebarMenuLabel: 'Documentation menu',
    externalLinkIcon: true,
    sidebar: {
      '/get-started/': [
        {
          text: 'Get Started',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/get-started/' },
            { text: 'Product overview', link: '/get-started/product-overview' },
            { text: 'Access your account', link: '/get-started/access-your-account' },
            { text: 'First steps', link: '/get-started/first-steps' },
            { text: 'Roles and access', link: '/get-started/roles-and-access' },
          ],
        },
      ],
      '/account/': [
        {
          text: 'Account',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/account/' },
            { text: 'Sign in', link: '/account/sign-in' },
            { text: 'Sign out', link: '/account/sign-out' },
            { text: 'Change password', link: '/account/change-password' },
            { text: 'Two-factor authentication', link: '/account/two-factor-authentication' },
            { text: 'Recovery codes', link: '/account/recovery-codes' },
            {
              text: 'Disable two-factor authentication',
              link: '/account/disable-two-factor-authentication',
            },
            { text: 'Audit history', link: '/account/audit-history' },
          ],
        },
      ],
      '/instances/': [
        {
          text: 'Cloud Instances',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/instances/' },
            { text: 'View your instances', link: '/instances/view-instances' },
            { text: 'Instance status', link: '/instances/instance-status' },
            { text: 'Start, stop, restart', link: '/instances/start-stop-restart' },
            { text: 'Metrics', link: '/instances/metrics' },
            { text: 'Web terminal', link: '/instances/web-terminal' },
            { text: 'Snapshots', link: '/instances/snapshots' },
            { text: 'Instance domains', link: '/instances/instance-domains' },
            { text: 'Proxy settings', link: '/instances/proxy-settings' },
            { text: 'Troubleshooting', link: '/instances/troubleshooting' },
          ],
        },
      ],
      '/static-sites/': [
        {
          text: 'Static Sites',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/static-sites/' },
            { text: 'Create a site', link: '/static-sites/create-site' },
            { text: 'Upload a deployment', link: '/static-sites/upload-deployment' },
            { text: 'Deploy from GitHub', link: '/static-sites/github-deployments' },
            { text: 'Deployment history', link: '/static-sites/deployment-history' },
            { text: 'Activate and rollback', link: '/static-sites/rollback' },
            { text: 'Shared subdomains', link: '/static-sites/shared-subdomains' },
            { text: 'Custom domains', link: '/static-sites/custom-domains' },
            { text: 'SPA fallback', link: '/static-sites/spa-fallback' },
            { text: 'Redirects, headers, 404s', link: '/static-sites/redirects-headers-404' },
            { text: 'Troubleshooting', link: '/static-sites/troubleshooting' },
          ],
        },
      ],
      '/domains/': [
        {
          text: 'Domains',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/domains/' },
            { text: 'DNS basics', link: '/domains/dns-basics' },
            { text: 'Connect a custom domain', link: '/domains/connect-custom-domain' },
            { text: 'Domain status', link: '/domains/domain-status' },
            { text: 'Cache and proxy', link: '/domains/cache-and-proxy' },
            { text: 'Troubleshooting', link: '/domains/troubleshooting' },
          ],
        },
      ],
      '/troubleshooting/': [
        {
          text: 'Troubleshooting',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/troubleshooting/' },
            { text: 'Error messages', link: '/troubleshooting/error-messages' },
            { text: 'Correlation IDs', link: '/troubleshooting/correlation-ids' },
            { text: 'Login and 2FA', link: '/troubleshooting/login-and-2fa' },
            { text: 'Deployments', link: '/troubleshooting/deployments' },
            { text: 'Domains', link: '/troubleshooting/domains' },
            { text: 'Contact support', link: '/troubleshooting/contact-support' },
          ],
        },
      ],
      '/contributing/': [
        {
          text: 'Contribute',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/contributing/' },
            { text: 'Style guide', link: '/contributing/style-guide' },
            { text: 'Content model', link: '/contributing/content-model' },
            { text: 'Local development', link: '/contributing/local-development' },
            { text: 'Pull request checklist', link: '/contributing/pull-request-checklist' },
            { text: 'Security and privacy', link: '/contributing/security-and-privacy' },
          ],
        },
      ],
    },
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
