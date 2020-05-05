<template>
  <q-page class="q-pa-md row justify-center items-center">
    <div class="form q-pa-xs">
      <div class="form-img row items-center justify-between q-ma-sm">
        <img width="100%" src="~assets/CoronaHelfer-Logo.svg" />
      </div>

      <div class="form-fields row">
        <div class="col-xs-12 col-md-3"></div>
        <q-form
          class="row items-center justify-between q-pa-lg col-xs-12 col-md-9"
        >
          <div v-if="error !== ''" class="error">{{ error }}</div>
          <q-input
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            :label="$t('emailOrPassword')"
            v-model="name"
          />
          <q-input
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            :type="isPwd ? 'password' : 'text'"
            :label="$t('password')"
            v-model="password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div class="row login-register">
            <q-btn
              color="primary"
              type="submit"
              bg-color="white"
              filled
              class="c-btn form-input col-xs-12 col-md-4"
              :loading="loading"
              :label="$t('login')"
              @click.prevent="login"
            ></q-btn>
            <q-btn
              class="c-link q-py-sm col-xs-12 col-md-8"
              flat
              :label="$t('orRegister')"
              to="/register"
            ></q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.login-register
  width: 100%
.oauth
  background-color: #4285F4
  width: 100%
  padding: 0.5rem
  border-radius: 0
</style>

<script>
import { callApi, authApi } from '../../api/requests'

export default {
  data() {
    return {
      previousRoute: undefined,
      name: '',
      password: '',
      error: '',
      loading: false,
      isPwd: true
    }
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.previousRoute = from.fullPath
    })
  },

  computed: {
    auth: {
      get() {
        return Object.assign({}, this.$store.state.auth.data)
      },
      set(val) {
        this.$store.commit('auth/updateData', val)
      }
    }
  },

  methods: {
    async login() {
      try {
        this.loading = true
        if (this.name === '' || this.password === '') {
          this.error = this.$t('wrongLogin')
          return
        }

        let body = {
          email: this.name,
          password: this.password
        }
        if (this.name.indexOf('@') === -1) {
          body = {
            phone: this.name,
            password: this.password
          }
        }

        const loginResponse = await authApi(body)

        if (loginResponse === 404) {
          this.error = this.$t('unknownUser')
          return
        }

        if (loginResponse === 401) {
          this.error = this.$t('wrongPassword')
          return
        }

        const response = await callApi('/users/me', loginResponse.token)

        this.auth = {
          token: loginResponse.token,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          email: response.user.email,
          id: response.user._id,
          verified: response.user.verified,
          authenticated: true,
          address: {
            number: response.user.address.street_nr,
            street: response.user.address.street,
            zipcode: response.user.address.plz,
            city: response.user.address.city
          }
        }

        if (
          ['/help', '/get-help'].includes(this.previousRoute) ||
          this.previousRoute.startsWith('/verify')
        ) {
          this.$router.replace(this.previousRoute)
        } else {
          this.$router.replace('/profile')
        }
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
