import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  /**
  * env
  */
  env: {
    SERVER_URL: process.env.SERVER_URL,
    HOST: process.env.HOST
  },
  /*
  ** Headers of the page
  */
  server: {
    host: process.env.HOST !== undefined
      ? process.env.HOST
      : '0.0.0.0',
    port: 3000
  },
  head: {
    titleTemplate: '%s',
    title: '커미션 사이트 세메센(CMSN)',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'SNS 트위터와 연동되는 커미션 홍보 사이트' }
    ],
    noscript: [{ innerHTML: "Art commission site - We're sorry but this site doesn't work properly without JavaScript enabled. Please enable it to continue. 안녕하세요. 창작 예술 커미션 사이트입니다. 그림 글 캘리그라피 공예 시각디자인 작곡 보이스 등 창작 커미션을 홍보하는 사이트입니다. 방문자분의 브라우저에 자바스크립트가 활성화되어 있지 않아 사이트가 정상 작동하지 않습니다. 자바스크립트를 활성화시키고 새로고침 하여 주세요. 감사합니다." }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap'}
    ],
    script: [
      {src:'https://securepubads.g.doubleclick.net/tag/js/gpt.js', async:'async'},
      {src:'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', async:'async'},
      {src:'/js/googleads.js'} // static/js
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#5dc596' },
  /*
  ** Global CSS
  */
  css: [
    '~/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/masonry', ssr: false, client:true},
    { src: '~/plugins/main', ssr: false, client:true},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics',
    '@nuxtjs/dotenv'
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          gold:'#c08028',
          silver: '#5F647D',
          background:'#EDEEF0'
        }
      }
    }
  },
  /**
   * google analytics
   */
  googleAnalytics: {
    id: 'UA-121532539-1'
  },
  /*
  ** Build configuration
  */

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
