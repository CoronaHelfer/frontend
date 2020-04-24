<template>
  <q-page class="q-pa-md row justify-center items-center">
    <div class="form q-pa-lg">
      <div class="form-img row items-center justify-between">
        <img width="100%" src="~assets/CoronaHelfer-Logo.svg" />
      </div>

      <div class="form-fields row">
        <div class="col-xs-12 col-md-4"></div>
        <q-form
          class="row items-center justify-between q-pa-lg col-xs-12 col-md-8"
          @submit="login()"
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
              bg-color="white"
              filled
              class="c-btn form-input col-xs-12 col-md-4"
              :loading="loading"
              :label="$t('login')"
            ></q-btn>
            <q-btn
              class="c-link q-py-sm col-xs-12 col-md-8"
              flat
              :label="$t('orRegister')"
              to="/register"
            ></q-btn>
          </div>

          <button class="oauth q-my-md row">
            <div>
              <q-icon class="q-mr-xl q-ml-md" name="fab fa-facebook-f"></q-icon>
            </div>
            <div>{{ $t('loginFacebook') }}</div>
          </button>

          <button class="oauth q-my-md row">
            <div>
              <q-icon class="q-mr-xl q-ml-md" name="fab fa-google"></q-icon>
            </div>
            <div>{{ $t('loginGoogle') }}</div>
          </button>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.login-register
  width: 100%
.form-img
  padding: 20%
  background-color: $primary

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
      name: '',
      password: '',
      error: '',
      loading: false
    }
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
          throw new Error(this.$t('wrongLogin'))
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

        if (res.error) {
          console.error(res.error)
          throw new Error(this.$t('somethingWentWrong'))
        } else if (!res.token) {
          console.error('No token provided.')
          throw new Error(this.$t('somethingWentWrong'))
        }

        await callApi('/users/me', res.token).then((resp) => {
          this.auth = {
            token: res.token,
            firstname: resp.user.firstName,
            lastname: resp.user.lastName,
            email: resp.user.email,
            id: resp.user._id,
            authenticated: true
          }
          this.$router.go(-1)
        })
      } catch (e) {
        this.error = e
        this.loading = false
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
