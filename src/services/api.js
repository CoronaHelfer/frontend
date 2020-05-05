import configuration from '../assets/config'
import { axiosInstance } from '../boot/axios'

export default {
  get: (path, token) => {
    return axiosInstance.get(
      `${configuration.apiUrl}${configuration.apiRoot}${path}`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : null
    )
  },

  post: (path, payload, token) => {
    return axiosInstance.post(
      `${configuration.apiUrl}${configuration.apiRoot}${path}`,
      payload,
      token ? { headers: { Authorization: `Bearer ${token}` } } : null
    )
  },

  put: (path, payload, token) => {
    return axiosInstance.put(
      `${configuration.apiUrl}${configuration.apiRoot}${path}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },

  delete: (path, payload, token) => {
    return axiosInstance.delete(
      `${configuration.apiUrl}${configuration.apiRoot}${path}`,
      {
        data: payload,
        headers: { Authorization: `Bearer ${token}` }
      }
    )
  }
}
