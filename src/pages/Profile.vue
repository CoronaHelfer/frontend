<template>
  <q-page>
    <header>
      <h1>{{$t('profile')}}</h1>
    </header>

    <body>
      <article>
        <h2>Willkommen {{auth.firstname}} {{auth.lastname}}</h2>

        <div class="row">
          <div class="col">
            <q-input
              dense filled
              v-model="firstname"
              label="Vorname"
              class="input"
            ></q-input>
          </div>
          <div class="col">
            <q-input
              dense filled
              v-model="lastname"
              label="Nachname"
              class="input"
            ></q-input>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-input
              dense filled
              v-model="street"
              label="Straße"
              class="input"
            ></q-input>
          </div>
          <div class="col-2">
            <q-input
              dense filled
              v-model="streetNumber"
              label="Hausnummer"
              class="input"
            ></q-input>
          </div>
        </div>

        <div class="row">
          <div class="col-2">
            <q-input
              dense filled
              v-model="zip"
              label="PLZ"
              class="input"
            ></q-input>
          </div>
          <div class="col">
            <q-input
              dense filled
              v-model="city"
              label="Stadt"
              class="input"
            ></q-input>
          </div>
        </div>

        <q-btn
          rounded
          color="secondary"
          label="Speichern"
          class="full-width"
          :loading="loading"
          v-on:click="update()"></q-btn>
      </article>
    </body>
  </q-page>
</template>

<style lang="sass" scoped>
header
  text-align: center
  background: url('../statics/images/background.jpg') no-repeat
  background-size: cover
  padding: 50px
  color: white

  .q-btn
    background: white
    border: 0
    border-radius: 19px
    color: $secondary
    cursor: pointer
    font-size: 20px
    font-weight: 400
    padding: 0 50px
    text-transform: uppercase

    &:focus
      outline: none

    &.primary
      background: $secondary
      color: white

    &.small
      height: 30px
      line-height: 30px
      padding: 0 30px
      font-size: 15px
      font-weight: 600
      margin-top: 15px

body
  &:before
    background-color: white
    border-radius: 100%
    content: ''
    height: 50px
    position: absolute
    top: -25px
    width: 100%

  background-color: white
  position: relative
  padding-bottom: 20px
  min-height: calc(100vh - 340px)

  article
    padding-top: 30px
    margin: 20px auto 0
    max-width: 800px

.input
  margin: 20px 10px
</style>

<script>
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      street: '',
      streetNumber: '',
      zip: '',
      city: ''
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
    update() {
    }
  }
}
</script>
