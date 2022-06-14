import axios from 'axios'

const url = "http://127.0.0.1:8080"
export default() => {
    return axios.create({
      baseURL: url
    })
}