import axios from 'axios'
import configuration from '../assets/config'

const axiosInstance = axios.create({
  baseURL: `${configuration.apiUrl}${configuration.apiRoot}`
})

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}

export { axiosInstance }
