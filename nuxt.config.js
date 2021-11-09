const colors = require('vuetify/es5/util/colors').default

module.exports = {
  telemetry: false,
  mode: 'spa',
  /**
  * env
  */
  env: {
    SERVER_URL: getBaseServerUrl()
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
    noscript: [{ innerHTML: "Art commission site - We're sorry but this site doesn't work properly without JavaScript enabled. Please enable it to continue. 안녕하세요. 창작 예술 커미션 사이트입니다. 그림 글 캘리그라피 공예 시각디자인 작곡 보이스 등 창작 커미션을 홍보하는 사이트입니다. 방문자분의 브라우저에 자바스크립트가 활성화되어 있지 않아 사이트가 정상 작동하지 않습니다. 자바스크립트를 활성화시키고 새로고침 하여 주세요. 감사합니다." }],
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
    { src: '~/plugins/masonry', ssr: false, client:true},
    { src: '~/plugins/main', ssr: false, client:true}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    ['@nuxt/typescript-build', {
      typeCheck: false,
      ignoreNotFoundWarnings: false
    }],
    '@nuxtjs/axios',
    '@nuxtjs/google-analytics'
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
          silver: '#5F647D',
          background:'#EDEEF0'
        }
      }
    }
  },
  /**
   * axios
   */
  axios: {
    baseURL: getBaseServerUrl()
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

function getBaseServerUrl(){
  let url;
  if( process.env.NODE_ENV === 'production' ){

    if( process.env.SERVER_URL !== undefined ){

      url = process.env.SERVER_URL

    } else {
      throw new Error('process.env.SERVER_URL is empty. This env is mandatory for production >_<');
    }
  } else if( process.env.NODE_ENV === 'development' ) {

    url = "127.0.0.1:8080"

  } else {
    console.log(`NODE_ENV is set to ${process.env.NODE_ENV}. Not production nor development`)
    url = "127.0.0.1:8080"
  }

  console.log('[nuxt] api target SERVER_URL: ', url)

  return url
}
