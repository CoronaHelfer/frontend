<template>
  <q-page>
    <q-card class="bg-black flex flex-center">
      <q-img src="~assets/CoronaHelfer-Logo.svg"></q-img>
    </q-card>

    <q-card>
      <form>
        <div v-if="error !== ''" class="error">{{ error }}</div>
        <q-input
          filled
          bg-color="yellow-1"
          :label="$t('emailOrPassword')"
          v-model="name"
        />
        <q-input
          filled
          bg-color="yellow-1"
          type="password"
          :label="$t('password')"
          v-model="password"
        />

        <div class="row">
          <q-btn
            color="primary"
            :loading="loading"
            :label="$t('login')"
            v-on:click="login()"
          ></q-btn>
          <q-btn
            flat
            :label="$t('orRegister')"
            to="/register"></q-btn>
        </div>

        <button class="oauth facebook row">
          <div><q-icon name="fab fa-facebook-f"></q-icon></div>
          <div>{{$t('loginFacebook')}}</div>
        </button>

        <button class="oauth google row">
          <div><q-icon name="fab fa-google"></q-icon></div>
          <div>{{$t('loginGoogle')}}</div>
        </button>
      </form>
    </q-card>
    <img class="logo" width="100"  />
  </q-page>
</template>

<style lang="sass" scoped>
.q-page
  justify-content: center
  align-items: center
  display: flex

.q-card:first-of-type
  width: 34rem
  right: 20rem
  z-index: 1
  padding: 6.8rem 4.1rem
  position: relative

.q-card:last-of-type
  width: 69.5rem
  height: 37.5rem
  background-color: $secondary
  border-radius: 0.6rem
  padding-left: 30rem
  position: absolute

form
  padding: 4rem
  .error
    background: RED
    color: WHITE
    padding: 0.6rem 1.6rem
    margin-bottom: 1rem
    border-radius: 1.2rem

  .q-input
    margin: 1rem 0

  .q-btn:first-of-type
    border-radius: 0.6rem

  .q-btn
    padding: 0 2rem
    font-size: 1rem
    margin-top: 1rem

  .oauth
    background-color: #4285F4
    width: 100%
    position: relative
    border-radius: 0
    i
      position: absolute
      top: 1rem
      left: 1rem
    div:last-of-type
      width: 100%

  .facebook
    margin-top: 8rem

  .google
    margin-top: 2rem
</style>

<script>
import { callApi } from '../../api/requests'

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

        let res = await fetch(
          this.$q.localStorage.getItem('server') + '/api/v1/auth/login',
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
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
        this.$router.go(-1)
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
