import apiService from '../services/api'
import { clone } from 'ramda'

const initialState = {
  token: '',
  authenticated: false,

  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: {
    street: '',
    city: '',
    number: '',
    zipcode: ''
  },
  verified: false
}

export default {
  namespaced: true,
  state: clone(initialState),

  actions: {
    async register(context, payload) {
      const response = await apiService.post('/auth/register', payload)

      context.commit('setAuthenticated', { authenticated: true, token: response.data.token })
      await context.dispatch('getMe', { token: response.data.token })
    },

    async login(context, payload) {
      const response = await apiService.post('/auth/login', payload)

      context.commit('setAuthenticated', { authenticated: true, token: response.data.token })
      await context.dispatch('getMe', { token: response.data.token })
    },

    async getMe(context, payload) {
      const response = await apiService.get('/users/me', payload.token)

      context.commit('setUser', { user: response.data.user })
    },

    async logout(context) {
      context.commit('setAuthenticated', { authenticated: false, token: '' })
      context.commit('setUser', { user: initialState })
    }
  },

  getters: {
    user: state => state.user,
    loggedIn: state => state.user !== null
  },

  mutations: {
    setAuthenticated(state, payload) {
      state.authenticated = payload.authenticated
      state.token = payload.token
    },

    setUser(state, payload) {
      state.firstName = payload.user.firstName
      state.lastName = payload.user.lastName
      state.email = payload.user.email
      state.id = payload.user._id
      state.verified = payload.user.verified

      if (payload.user.address) {
        state.address = {
          number: payload.user.address.street_nr || '',
          street: payload.user.address.street,
          zipcode: payload.user.address.plz || '',
          city: payload.user.address.city
        }
      }
    }
  }
}
