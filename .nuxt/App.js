import Vue from 'vue'

import {
  getMatchedComponentsInstances,
  promisify,
  globalHandleError
} from './utils'

import NuxtError from '../layouts/error.vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../css/main.css'

import _6f6c098b from '../layouts/default.vue'

const layouts = { "_default": _6f6c098b }

export default {
  head: {"titleTemplate":"%s","title":"커미션 사이트 세메센(CMSN)","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"SNS 트위터와 연동되는 커미션 홍보 사이트"}],"noscript":[{"innerHTML":"Art commission site - We're sorry but this site doesn't work properly without JavaScript enabled. Please enable it to continue. 안녕하세요. 창작 예술 커미션 사이트입니다. 그림 글 캘리그라피 공예 시각디자인 작곡 보이스 등 창작 커미션을 홍보하는 사이트입니다. 방문자분의 브라우저에 자바스크립트가 활성화되어 있지 않아 사이트가 정상 작동하지 않습니다. 자바스크립트를 활성화시키고 새로고침 하여 주세요. 감사합니다."}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900&display=swap"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002F@mdi\u002Ffont@latest\u002Fcss\u002Fmaterialdesignicons.min.css"}],"script":[{"src":"https:\u002F\u002Fsecurepubads.g.doubleclick.net\u002Ftag\u002Fjs\u002Fgpt.js","async":"async"},{"src":"https:\u002F\u002Fpagead2.googlesyndication.com\u002Fpagead\u002Fjs\u002Fadsbygoogle.js","async":"async"},{"src":"\u002Fjs\u002Fgoogleads.js"}],"style":[]},

  render (h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })

    if (this.nuxt.err && NuxtError.layout) {
      this.setLayout(
        typeof NuxtError.layout === 'function'
          ? NuxtError.layout(this.context)
          : NuxtError.layout
      )
    }

    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter (el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,

      transitionEl
    ])
  },

  data: () => ({
    isOnline: true,

    layout: null,
    layoutName: ''
  }),

  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this

      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
    // Add $nuxt.context
    this.context = this.$options.context
  },

  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline () {
      return !this.isOnline
    }
  },

  methods: {
    refreshOnlineStatus () {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    async refresh () {
      const pages = getMatchedComponentsInstances(this.$route)

      if (!pages.length) {
        return
      }
      this.$loading.start()

      const promises = pages.map((page) => {
        const p = []

        if (page.$options.fetch) {
          p.push(promisify(page.$options.fetch, this.context))
        }

        if (page.$options.asyncData) {
          p.push(
            promisify(page.$options.asyncData, this.context)
              .then((newData) => {
                for (const key in newData) {
                  Vue.set(page.$data, key, newData[key])
                }
              })
          )
        }

        return Promise.all(p)
      })
      try {
        await Promise.all(promises)
      } catch (error) {
        this.$loading.fail()
        globalHandleError(error)
        this.error(error)
      }
      this.$loading.finish()
    },

    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) {
          this.$loading.fail()
        }
        if (this.$loading.finish) {
          this.$loading.finish()
        }
      }
    },

    setLayout (layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },

  components: {
    NuxtLoading
  }
}
