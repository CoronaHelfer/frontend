<template>
  <q-page class="q-pa-md row justify-center items-center">
    <div class="form q-pa-lg">
      <div class="form-img row items-center justify-between q-ma-sm">
        <img
          width="100%"
          src="~assets/CoronaHelfer-Logo.svg"
          alt="Corona Logo"
        />
      </div>
      <div class="form-fields row">
        <div class="col-xs-12 col-md-3"></div>
        <q-form
          class="row items-center justify-between q-pa-lg col-xs-12 col-md-9"
          action=""
        >
          <div v-if="error !== ''" class="error">{{ error }}</div>
          <q-input
            name="firstname"
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-6"
            v-model="registration.firstName"
            :label="$t('firstname')"
          />
          <q-input
            name="lastname"
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-6"
            v-model="registration.lastName"
            :label="$t('lastname')"
          />
          <q-input
            name="mail"
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            v-model="registration.email"
            :label="$t('mail')"
          />
          <q-input
            name="phone"
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            v-model="registration.phoneNumber"
            :label="$t('phone')"
          />
          <q-input
            name="password"
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            v-model="registration.password"
            type="password"
            :label="$t('password')"
          />
          <q-input
            name="passwordRepeat"
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            v-model="registration.passwordRepeat"
            type="password"
            :label="$t('passwordRepeat')"
          />
          <div class="q-pa-sm">
            <div>
              {{ $t('acceptPrivacy') }}
              <span class="c-link">
                <router-link to="/privacy">
                  {{ $t('privacyTitle') }}
                </router-link>
              </span>
            </div>
            <q-btn
              color="primary"
              class="c-btn q-mt-lg"
              rounded
              id="register"
              :loading="loading"
              :label="$t('register')"
              v-on:click="register"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style lang="sass" scoped></style>

<script>
import { callApi, authApi } from '../services/api'

export default {
  data() {
    return {
      registration: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordRepeat: ''
      },
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
    async register() {
      try {
        this.loading = true
        this.error = ''

        if (this.password !== this.passwordRepeat) {
          throw new Error(this.$t('noMatchingPassword'))
        }

        if (
          this.registration.firstName === '' ||
          this.registration.lastName === '' ||
          this.registration.email === '' ||
          this.registration.phoneNumber === ''
        ) {
          throw new Error(this.$t('missingFields'))
        }

        const res = await authApi(
          {
            firstName: this.registration.firstName,
            lastName: this.registration.lastName,
            password: this.registration.password,
            email: this.registration.email,
            phoneNumber: this.registration.phoneNumber
          },
          'register'
        )

        if (res.error) {
          console.error(res.error)
          throw new Error(this.$t('somethingWentWrong'))
        } else if (!res.token) {
          console.error('No token provided.')
          throw new Error(this.$t('somethingWentWrong'))
        }

        const response = await callApi('/users/me', res.token)

        this.auth = {
          token: res.token,
          firstname: response.user.firstName,
          lastname: response.user.lastName,
          email: response.user.email,
          id: response.user._id,
          verified: response.user.verified,
          authenticated: true
        }

        this.$router.push('/profile')
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
