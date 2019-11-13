const colors = require('vuetify/es5/util/colors').default

if(process.env.NODE_ENV !== 'production'){
  const dotenv = require('dotenv');
  dotenv.config()
}


module.exports = {
  mode: 'spa',
  /**
  * env
  */
  env: {

  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s',
    title: '커미션 사이트 세메센(CMSN)',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'SNS 트위터와 연동되는 커미션 홍보 사이트' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    { src: '~/plugins/masonry', ssr: false, client:true },
    { src: '~/plugins/main', ssr: false, client:true }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify', '@nuxt/typescript-build', '@nuxtjs/axios', '@nuxtjs/google-analytics'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
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
          silver: '#707592',
          background:'#f3f2f2'
        }
      }
    }
  },
  /**
   * axios
   */
  axios: {
    baseURL: process.env.SERVER_URL
    // proxyHeaders: false
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
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
