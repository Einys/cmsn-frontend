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
  nuxtClientInit({ commit }, {req}) {
    // code
    console.log('[store/index.js] Clientinit')
    console.log('[store/index.js]', req)
    //if (req.session && req.user) {
      //commit('SET_USER', req.user)
    //}
  }
}
