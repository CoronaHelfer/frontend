import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://coronahelfer.eu/api/v1'
})
export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}
export { axiosInstance }
