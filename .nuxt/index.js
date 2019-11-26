import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

<<<<<<< HEAD
<<<<<<< HEAD
import nuxt_plugin_plugin_513a67f1 from 'nuxt_plugin_plugin_513a67f1' // Source: ./vuetify/plugin.js (mode: 'all')
import nuxt_plugin_googleanalytics_fb4a9ada from 'nuxt_plugin_googleanalytics_fb4a9ada' // Source: ./google-analytics.js (mode: 'client')
import nuxt_plugin_axios_6546309a from 'nuxt_plugin_axios_6546309a' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_masonry_18e5320f from 'nuxt_plugin_masonry_18e5320f' // Source: ../plugins/masonry (mode: 'client')
import nuxt_plugin_main_6a83762f from 'nuxt_plugin_main_6a83762f' // Source: ../plugins/main (mode: 'client')
import nuxt_plugin_nuxtclientinit_3893cbb9 from 'nuxt_plugin_nuxtclientinit_3893cbb9' // Source: ../plugins/nuxt-client-init.js (mode: 'client')
=======
import nuxt_plugin_plugin_3914ec1a from 'nuxt_plugin_plugin_3914ec1a' // Source: .\\vuetify\\plugin.js (mode: 'all')
import nuxt_plugin_googleanalytics_f92a826e from 'nuxt_plugin_googleanalytics_f92a826e' // Source: .\\google-analytics.js (mode: 'client')
import nuxt_plugin_axios_211a613d from 'nuxt_plugin_axios_211a613d' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_masonry_18e5320f from 'nuxt_plugin_masonry_18e5320f' // Source: ..\\plugins\\masonry (mode: 'client')
import nuxt_plugin_main_6a83762f from 'nuxt_plugin_main_6a83762f' // Source: ..\\plugins\\main (mode: 'client')
import nuxt_plugin_nuxtclientinit_3893cbb9 from 'nuxt_plugin_nuxtclientinit_3893cbb9' // Source: ..\\plugins\\nuxt-client-init.js (mode: 'client')
>>>>>>> 10b7389895b1009468f6fea985247810eca7b6d2
=======
import nuxt_plugin_plugin_d9a85976 from 'nuxt_plugin_plugin_d9a85976' // Source: .\\vuetify\\plugin.js (mode: 'all')
import nuxt_plugin_googleanalytics_9936f198 from 'nuxt_plugin_googleanalytics_9936f198' // Source: .\\google-analytics.js (mode: 'client')
import nuxt_plugin_axios_7709adb2 from 'nuxt_plugin_axios_7709adb2' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_masonry_18e5320f from 'nuxt_plugin_masonry_18e5320f' // Source: ..\\plugins\\masonry (mode: 'client')
import nuxt_plugin_main_6a83762f from 'nuxt_plugin_main_6a83762f' // Source: ..\\plugins\\main (mode: 'client')
>>>>>>> f6bd61ac1d6fa495f92aefc23ea38948ad8de7df

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn(`<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead`)
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>`
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [ defaultTransition ],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [ transitions ]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        const nuxt = this.nuxt || this.$options.nuxt
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error('inject(key, value) has no value provided')
    }

    key = '$' + key
    // Add into app
    app[key] = value

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Vue.prototype.hasOwnProperty(key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Plugin execution

<<<<<<< HEAD
<<<<<<< HEAD
  if (typeof nuxt_plugin_plugin_513a67f1 === 'function') {
    await nuxt_plugin_plugin_513a67f1(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_fb4a9ada === 'function') {
    await nuxt_plugin_googleanalytics_fb4a9ada(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_6546309a === 'function') {
    await nuxt_plugin_axios_6546309a(app.context, inject)
=======
  if (typeof nuxt_plugin_plugin_3914ec1a === 'function') {
    await nuxt_plugin_plugin_3914ec1a(app.context, inject)
=======
  if (typeof nuxt_plugin_plugin_d9a85976 === 'function') {
    await nuxt_plugin_plugin_d9a85976(app.context, inject)
>>>>>>> f6bd61ac1d6fa495f92aefc23ea38948ad8de7df
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_9936f198 === 'function') {
    await nuxt_plugin_googleanalytics_9936f198(app.context, inject)
  }

<<<<<<< HEAD
  if (typeof nuxt_plugin_axios_211a613d === 'function') {
    await nuxt_plugin_axios_211a613d(app.context, inject)
>>>>>>> 10b7389895b1009468f6fea985247810eca7b6d2
=======
  if (typeof nuxt_plugin_axios_7709adb2 === 'function') {
    await nuxt_plugin_axios_7709adb2(app.context, inject)
>>>>>>> f6bd61ac1d6fa495f92aefc23ea38948ad8de7df
  }

  if (process.client && typeof nuxt_plugin_masonry_18e5320f === 'function') {
    await nuxt_plugin_masonry_18e5320f(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_main_6a83762f === 'function') {
    await nuxt_plugin_main_6a83762f(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
