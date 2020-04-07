<template>
  <q-page>
    <body>
      <div class="authenticate">
        <div class="container">
          <form class="login">
            <div v-show="error != ''" class="error">{{ error }}</div>
            <input
              type="text"
              placeholder="E-Mail oder Telefonnummer"
              v-model="name"
            />
            <input type="password" placeholder="Passwort" v-model="password" />

            <q-btn
              rounded
              :loading="loading"
              label="Login"
              v-on:click="login()"
            />
            <q-btn
              rounded
              label="Registrieren"
              @click="$router.push('/register')"
            />
          </form>
        </div>
      </div>
    </body>
  </q-page>
</template>

<style lang="sass" scoped>
body
  background: url('../statics/images/background.jpg') no-repeat
  background-size: cover

.authenticate
  padding: 20px
  display: flex
  justify-content: center
  align-items: center
  height: calc(100vh - 170px)
  box-sizing: border-box
  .container
    width: 400px
    .login,
    .register
      background-color: WHITE
      padding: 15px 30px
      display: flex
      flex-direction: column
      border-radius: 25px
      .error
        background: RED
        color: WHITE
        padding: 10px 25px
        margin-bottom: 15px
        border-radius: 19px
        font-size: 13px
      input
        width: 100%
        background-color: LIGHTGRAY
        border: none
        box-shadow: none
        padding: 0 25px
        height: 30px
        box-sizing: border-box
        margin-bottom: 5px
        border-radius: 19px
        &:focus
          outline: none
        &.spacer
          margin-bottom: 15px
      button
        background-color: $secondary
        color: WHITE
        height: 30px
        line-height: 30px
        padding: 0
        font-size: 15px
        font-weight: 600
        margin-top: 15px
    .register
      .aligner
        display: flex
        margin-bottom: 10px
        .left
          width: 40%
          .avatar
            background: url('../statics/images/avatar.jpg') no-repeat
            background-size: cover
            width: 65px
            height: 65px
            border-radius: 100%
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
          this.error = this.$t('wrongLogin')
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
          this.$q.localStorage.getItem('server') + 'auth/login',
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          }
        )
        res = await res.json()

        if (res.error) throw new Error(res.error)
        if (!res.token) throw new Error('No token provided.')

        await callApi(
          this.$q.localStorage.getItem('server') + 'users/me',
          res.token
        ).then((resp) => {
          this.auth = {
            token: res.token,
            firstname: resp.user.firstName,
            lastname: resp.user.lastName,
            email: resp.user.email,
            authenticated: true
          }
        })
        
        this.$router.go(-1)
      } catch (e) {
        console.error(e)
        this.error = e
        this.loading = false
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
