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
              />
              <input
                type="text"
                placeholder="Nachname"
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="E-Mail"
          />
          <input
            class="spacer"
            type="text"
            placeholder="Telefon"
          />
          <input
            type="password"
            placeholder="Passwort"
          />
          <input
            type="password"
            placeholder="Passwort wiederholen"
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
}
</script>
