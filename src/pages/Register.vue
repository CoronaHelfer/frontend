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
          <div v-if="error !== ''" class="error col-12">{{ error }}</div>
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
              <router-link to="/privacy" class="c-link">
                {{ $t('privacyTitle') }}
              </router-link>
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
import { clone } from 'ramda'

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
    auth() {
      return clone(this.$store.state.auth)
    }
  },

  methods: {
    async register() {
      try {
        this.loading = true
        this.error = ''

        if (this.registration.password !== this.registration.passwordRepeat) {
          this.error = this.$t('noMatchingPassword')
          return
        }

        if (
          this.registration.firstName === '' ||
          this.registration.lastName === '' ||
          this.registration.email === '' ||
          this.registration.phoneNumber === ''
        ) {
          this.error = this.$t('missingFields')
          return
        }

        await this.$store.dispatch('auth/register', {
          firstName: this.registration.firstName,
          lastName: this.registration.lastName,
          password: this.registration.password,
          email: this.registration.email,
          phoneNumber: this.registration.phoneNumber
        })

        this.$router.push('/profile')
      } catch (error) {
        console.error(error)

        if (!error.response) {
          this.error = 'An unexpected error occurred!'
        }

        if (error.response.status === 400) {
          // TODO check or implement 400 on backend
          this.error = this.$t('badRequest')
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
