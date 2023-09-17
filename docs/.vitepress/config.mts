import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Heysoo",
  description: "Heysoo Documents",
  themeConfig: {
    search: {
      provider: 'local',
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/get-started' },
    ],

    sidebar: [
      {
        text: 'Get Started',
        link: '/get-started'
      },
      {
        text: 'Guide',
        items: [
          { text: 'Router', link: '/router' },
          { text: 'Controller', link: '/controller' },
          { text: 'Service', link: '/service' },
          { text: 'View', link: '/view' },
          { text: 'Static', link: '/static' },
          { text: 'Database', link: '/database' },
          { text: 'Schedule', link: '/schedule' },
          { text: 'API', link: '/api' },
          { text: 'FAQ', link: '/FAQ' },
        ],
      },
      {
        text: 'Futher',
        link: '/futher'
      },
      {
        text: 'Benchmark',
        link: '/benchmark'
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hishengs/heysoo' }
    ]
  }
})
