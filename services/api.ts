import axios from 'axios'

const url = process.env.VUE_APP_SERVER_URL
export default() => {

    return axios.create({
      baseURL: url
    })
  }