import Api from './api'
import axios from 'axios'
let dataUrl = '/1.0/data/';

export default {
  reportError( errString ){
    return Api().post( dataUrl + 'error' , { message: errString } , { timeout: 5000 })
  },
  login() {
    return Api().get('/auth/twitter')
  },

  getItemlist ( params ) {

    const url = process.env.SERVER_URL
    console.log('SERVER_URL:', url)
    const api = axios.create({
      baseURL: url
    })

    return api.get( dataUrl + 'items/list', {
      params: params,
      timeout: 5000 // 5초 이내에 응답이 오지 않으면 에러로 간주
    })
  },
  getBotLimit( cat ) {
    return Api().get( dataUrl + 'bots/limit/' + cat)
  }
}
