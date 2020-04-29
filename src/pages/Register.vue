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
            v-model="firstname"
            :label="$t('firstname')"
          />
          <q-input
            name="lastname"
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-6"
            v-model="lastname"
            :label="$t('lastname')"
          />
          <q-input
            name="mail"
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            v-model="mail"
            :label="$t('mail')"
          />
          <q-input
            name="phone"
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            v-model="phone"
            :label="$t('phone')"
          />
          <q-input
            name="password"
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            v-model="password"
            type="password"
            :label="$t('password')"
          />
          <q-input
            name="passwordRepeat"
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            v-model="passwordRepeat"
            type="password"
            :label="$t('passwordRepeat')"
          />
          <div class="q-pa-sm">
            <div>
              {{ $t('acceptPrivacy') }}
              <span class="c-link">
                <router-link to="/privacy">{{ $t('privacyTitle') }}</router-link>.
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
import { callApi, authApi } from '../../api/requests'

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      mail: '',
      phone: '',
      password: '',
      passwordRepeat: '',
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
          this.firstname === '' ||
          this.lastname === '' ||
          this.mail === '' ||
          this.phone === ''
        ) {
          throw new Error(this.$t('missingFields'))
        }
        const res = await authApi(
          {
            firstName: this.firstname,
            lastName: this.lastname,
            password: this.password,
            email: this.mail,
            phoneNumber: this.phone
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

        await callApi('/users/me', res.token).then((resp) => {
          this.auth = {
            token: res.token,
            firstname: resp.user.firstName,
            lastname: resp.user.lastName,
            email: resp.user.email,
            id: resp.user._id,
            authenticated: true
          }
        })
        this.$router.go(-2) // Assumes that user came via /login page
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
