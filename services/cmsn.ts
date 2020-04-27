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

  getItemlist ( params: {cat?:string, intent?:string, count?:number, skip?:number, dateBefore?: any, keyword?:string} ) {

    return Api().get( dataUrl + 'items/list', {
      params: params,
      timeout: 5000 // 5초 이내에 응답이 오지 않으면 에러로 간주
    })
  },
  getBotLimit( cat: string ) {
    return Api().get( dataUrl + 'bots/limit/' + cat)
  }
}
