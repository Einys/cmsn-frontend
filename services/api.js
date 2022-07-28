import axios from 'axios'

const url = process.env.SERVER_URL
console.log('SERVER_URL:', url)
export default() => {
    return axios.create({
      baseURL: url
    })
}