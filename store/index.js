export const state = () => ({
    counter: 0,
    authUser: null,
    route: null,
    lang: ['KOR']
})

export const mutations = {
    increment(state) {
        state.counter++
    },
    SET_USER(state, user) {
        state.authUser = user
    },
    SET_ROUTE(state, route){
        state.route = route
    }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
      console.log('[store/index.js] Serverinit')
      console.log('[store/index.js]', req.originalUrl)
    if (req.session && req.user) {
      commit('SET_USER', req.user)
    }
  }
}