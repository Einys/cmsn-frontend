import Api from './api'
let dataUrl = '/1.0/data/';

export default {
  reportError( errString ){
    return Api().post( dataUrl + 'error' , { message: errString } , { timeout: 5000 })
  },
  login() {
    return Api().get('/auth/twitter')
  },

  getItemlist ( params ) {
    return Api().get( dataUrl + 'items/list', {
      params: params,
      timeout: 5000 // 5초 이내에 응답이 오지 않으면 에러로 간주
    })
  },
  getBotLimit( cat ) {
    return Api().get( dataUrl + 'bots/limit/' + cat)
  }
}
