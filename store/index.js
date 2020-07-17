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
  nuxtServerInit({ commit, req }, context) {
    // code
    console.log('[store/index.js] Serverinit')
    if(context && context.$axios){
      console.log('[store/index.js]context.$axios')
      context.$axios.$get('/user').then(res =>{
        console.log('user data :',res)
        commit('SET_USER', res)
      }).catch(err =>{
        context.$nuxt.error(err)
      })
    } else {
      console.log('context or context.$axios is not defined')
    }
  },
  getUser({commit}, context){
    console.log('[store/index.js]context.$axios')
    return this.$axios.$get('/user').then(res =>{
      commit('SET_USER', res)
    }).catch(err =>{
      context.$nuxt.error(err)
    })
  },
  logout({commit}, context){
    if(context && context.$axios){
      context.$axios.$get('/logout').then(res =>{
        context.$nuxt.error('test error')
        commit('SET_USER', null)
      }).catch(err =>{
        context.$nuxt.error(err)
      })
    } else {
      console.log('context or context.$axios is not defined')
    }

  }
}
