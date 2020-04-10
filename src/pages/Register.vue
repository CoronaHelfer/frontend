<template>
  <q-page>
    <body>
      <div class="authenticate">
        <div class="container">
          <form class="register">
            <div v-show="error !== ''" class="error">{{error}}</div>
            <div class="aligner">
              <div class="left">
                <div class="avatar"/>
              </div>
              <div>
                <input type="text" placeholder="Vorname" v-model="firstname" />
                <input type="text" placeholder="Nachname" v-model="lastname" />
              </div>
            </div>
            <input type="text" placeholder="E-Mail" v-model="mail" />
            <input
              class="spacer"
              type="text"
              placeholder="Telefon"
              v-model="phone"
            />
            <input type="password" placeholder="Passwort" v-model="password" />
            <input
              type="password"
              placeholder="Passwort wiederholen"
              v-model="passwordRepeat"
            />

            <p>Mit der Registrierung akzeptierst du unsere <router-link to="/privacy">Datenschutzerklärung</router-link>.</p>
            <q-btn
              rounded
              :loading="loading"
              label="Registrieren"
              v-on:click="register"
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
    .divider
      color: WHITE
      font-weight: 600
      font-size: 14px
      text-align: center
      margin: 14px
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
          this.$q.localStorage.getItem('server') + 'auth/register',
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
          this.$q.localStorage.getItem('server') + 'users/me',
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
