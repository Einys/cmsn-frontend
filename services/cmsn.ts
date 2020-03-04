import Api from '@/services/api'
let dataUrl = '/1.0/data/';

export default {
  reportError( err: any, info: any ){
    return Api().post( dataUrl + 'error' , {
        error: err,
        info: info
      }, { timeout: 5000 })
  },
  login() {
    return Api().get('/auth/twitter')
  },
  getUserByName( name ){
    return Api().get( dataUrl + 'users/name/' + name, {
      timeout: 5000 // 5초 이내에 응답이 오지 않으면 에러로 간주
    })
  }
}
