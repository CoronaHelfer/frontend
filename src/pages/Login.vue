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
            type="password"
            :label="$t('password')"
            v-model="password"
          />

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

          <!-- <button class="oauth q-my-md row">
            <div>
              <q-icon class="q-mr-md q-ml-xs" name="fab fa-facebook-f"></q-icon>
            </div>
            <div class="q-mt-xs">{{ $t('loginFacebook') }}</div>
          </button>

          <button class="oauth q-my-md row">
            <div>
              <q-icon class="q-mr-md q-ml-xs" name="fab fa-google"></q-icon>
            </div>
            <div class="q-mt-xs">{{ $t('loginGoogle') }}</div>
          </button> -->
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
      loading: false
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.previousRoute = from.path
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

        const res = await authApi(body)

        if (res === 404) {
          this.error = this.$t('unknownUser')
          return
        }

        if (res === 401) {
          this.error = this.$t('wrongPassword')
          return
        }

        await callApi('/users/me', res.token).then((resp) => {
          this.auth = {
            token: res.token,
            firstname: resp.user.firstName,
            lastname: resp.user.lastName,
            email: resp.user.email,
            id: resp.user._id,
            verified: resp.user.verified,
            authenticated: true
          }

          if (['/help', '/get-help'].includes(this.previousRoute)) {
            this.$router.replace(this.previousRoute)
          } else {
            this.$router.replace('/profile')
          }
        })
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
