<template>
  <q-page>
    <body>
    <div class="authenticate">
      <div class="container">
        <form class="register">
          <div class="aligner">
            <div class="left">
              <div class="avatar"/>
            </div>
            <div class="right">
              <input
                type="text"
                placeholder="Vorname"
                v-model="firstname"
              />
              <input
                type="text"
                placeholder="Nachname"
                v-model="lastname"
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="E-Mail"
            v-model="mail"
          />
          <input
            class="spacer"
            type="text"
            placeholder="Telefon"
            v-model="phone"
          />
          <input
            type="password"
            placeholder="Passwort"
            v-model="password"
          />
          <input
            type="password"
            placeholder="Passwort wiederholen"
            v-model="passwordRepeat"
          />
          <q-btn
            rounded
            label="Registrieren"
            v-on:click="register"/>
        </form>
      </div>
    </div>
    </body>
  </q-page>
</template>

<style lang="sass" scoped>
  body
    background: url('../statics/background.jpg') no-repeat
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
export default {
  data () {
    return {
      firstname: '',
      lastname: '',
      mail: '',
      phone: '',
      password: '',
      passwordRepeat: ''
    }
  },

  methods: {
    async register () {
      try {
        // setLoading(true)
        if (this.password !== this.passwordRepeat) throw new Error('Passwords do not match.')

        if (this.firstname === '' || this.lastname === '' || this.mail === '' || this.phone === '') {
          throw new Error('Not all fields are filled.')
        }

        let res = await fetch(this.$q.sessionStorage.getItem('server') + '/auth/register', {
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
        })

        res = await res.json()

        if (res.error) throw new Error(res.error)
        if (!res.token) throw new Error('No token provided.')

        // TODO: local or sessionstorage?
        window.localStorage.setItem('coronahelp-token', res.token)

        // TODO: Fetch User information
        /*        auth.set({
                  token: res.token,
                  firstname: '',
                  lastname: '',
                  email: '',
                  authenticated: true
                }) */
      } catch (e) {
        console.log(e)
        // setError(
        //   'Registrierung konnte nicht abgeschlossen werden. Überprüfen sie ihre Eingabe.',
        // )
      } finally {
        // setLoading(false)
      }
    }
  }
}
</script>
