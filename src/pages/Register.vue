<template>
  <q-page class="q-pa-md row justify-center items-center">
    <div class="form q-pa-lg">
      <div class="form-img row items-center justify-between">
        <img
          width="100%"
          src="statics/images/guus-baggermans.png"
          alt=""
          srcset=""
        />
      </div>
      <div class="form-fields row">
        <div class="col-xs-12 col-md-4"></div>
        <q-form
          class="row items-center justify-between q-pa-lg col-xs-12 col-md-8"
          action=""
        >
          <div v-if="error !== ''" class="error">{{ error }}</div>
          <q-input
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-6"
            v-model="text"
            :label="$t('firstname')"
            :dense="dense"
          />
          <q-input
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-6"
            v-model="text"
            :label="$t('lastname')"
            :dense="dense"
          />
          <q-input
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            v-model="text"
            :label="$t('mail')"
            :dense="dense"
          />
          <q-input
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            v-model="text"
            :label="$t('phone')"
            :dense="dense"
          />
          <q-input
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            v-model="text"
            :label="$t('password')"
            :dense="dense"
          />
          <q-input
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            v-model="text"
            :label="$t('passwordRepeat')"
            :dense="dense"
          />
          <div class="q-pa-sm">
            <div>
              {{ $t('acceptPrivacy') }}
            </div>
            <div class="c-link">
              <router-link to="/privacy">{{ $t('privacy') }}</router-link
              >.
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
import { callApi } from '../../api/requests'

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

        let res = await fetch(
          this.$q.localStorage.getItem('server') + '/api/v1/auth/register',
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              firstName: this.firstname,
              lastName: this.lastname,
              password: this.password,
              email: this.mail,
              phoneNumber: this.phone
            })
          }
        )

        res = await res.json()

        if (res.error) {
          console.error(res.error)
          throw new Error(this.$t('somethingWentWrong'))
        } else if (!res.token) {
          console.error('No token provided.')
          throw new Error(this.$t('somethingWentWrong'))
        }

        await callApi(
          this.$q.localStorage.getItem('server') + '/api/v1/users/me',
          res.token
        ).then((resp) => {
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
