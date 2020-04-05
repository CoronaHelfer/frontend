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
              :label="$t('login')"
              v-on:click="login()"
            />
            <q-btn
              rounded
              :label="$t('register')"
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
        let res = await fetch(
          this.$q.localStorage.getItem('server') + 'auth/login',
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.name,
              password: this.password
            })
          }
        )

        res = await res.json()
        // console.log(res)
        if (res.token) {
          const me = await callApi(
            this.$q.localStorage.getItem('server') + 'users/me',
            res.token
          )

          if (me.error) throw new Error('Token invalid.')

          this.auth = {
            token: res.token,
            firstname: me.user.firstName,
            lastname: me.user.lastName,
            email: me.user.email,
            phoneNumber: me.user.phoneNumber,
            picture: me.user.picture,
            createdAt: me.user.created_at,
            updatedAt: me.user.updated_at,
            authenticated: true
          }
          // console.log(this.auth)
          this.$router.push('/')
        } else {
          // We need another way to log this
          // if (res.error) throw new Error(res.error)
          // throw new Error('No token provided.')
        }
        // history.push(history.location.state ? history.location.state.from : '/')
      } catch (e) {
        console.error(e)
        this.error = this.$t('somethingWentWrong')
        this.loading = false
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
