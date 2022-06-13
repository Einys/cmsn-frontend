import axios from 'axios'

const url = process.env.VUE_APP_SERVER_URL
export default() => {

    console.log(url, 'axios-baseurl')
    return axios.create({
      baseURL: url
    })
}