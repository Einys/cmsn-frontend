import Vue from 'vue'
import cmsnService from '@/services/cmsn'

Vue.config.productionTip = false


// 구글 애널리틱스
// @ts-ignore
import VueAnalytics from 'vue-analytics'
if( process.env.NODE_ENV == 'production' ){
  console.log('Production mode... activate google analytics')
  Vue.use(VueAnalytics, {
    id:'UA-121532539-1',
    router
  })
}else{
  console.log('Dev mode... deactivate google analytics')
}

// 에러 핸들러
Vue.config.errorHandler = (err, vm, info) => {
  console.log('error Handler')
  console.log(err)
  if(err){
    cmsnService.reportError( err.message + ' stack:'+ err.stack, info);
  }

  // err: error trace
  // vm: component in which error occured
  // info: Vue specific error information such as lifecycle hooks, events etc.

  // TODO: Perform any custom logic or log to server

};
