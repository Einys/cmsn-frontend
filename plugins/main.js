import Vue from 'vue'

Vue.config.productionTip = false

Vue.config.errorHandler = (err, vm, info) => {
  console.log('error Handler')
  // console.log({message : err.message, stack: err.stack})

  if( vm && vm.$axios ){
    vm.$axios.$post('/1.0/data/error', { message : err.message, stack: err.stack } )
  }

  // err: error trace
  // vm: component in which error occured
  // info: Vue specific error information such as lifecycle hooks, events etc.

  // TODO: Perform any custom logic or log to server

};


// Adsense
import Ads from 'vue-google-adsense'

Vue.use(require('vue-script2'))

Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)