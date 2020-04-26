<template>
  <q-page>
    <header>
      <h1>{{$t('profile')}}</h1>
    </header>

    <body>
      <article>
        <h2>Willkommen {{auth.firstname}} {{auth.lastname}}</h2>
        <div class="row">
          <div class="col-2">
            <q-avatar color="grey-3" text-color="white" size="100px">{{auth.firstname[0]}}</q-avatar>
          </div>
          <div class="col">
            <p>{{auth.firstname}} {{auth.lastname}}</p>
            <p>{{auth.street}} {{auth.streetNumber}}</p>
            <p>{{auth.zip}} {{auth.city}}</p>
            <p>{{auth.phone}}</p>
          </div>
        </div>

        <div v-if="error !== ''" class="error">{{error}}</div>

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

.error
  background: RED
  color: WHITE
  padding: 10px 25px
  margin-bottom: 15px
  border-radius: 19px
  font-size: 13px

h2
  text-transform: none
</style>

<script>
import { callApi } from '../../api/requests'

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      street: '',
      streetNumber: '',
      zip: '',
      city: '',
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

  mounted() {
    this.firstname = this.auth.firstname
    this.lastname = this.auth.lastname
    this.street = this.auth.street
    this.streetNumber = this.auth.streetNumber
    this.zip = this.auth.zip
    this.city = this.auth.city
  },

  methods: {
    async fetchUserData() { // TODO: Deduplicate this request
      await callApi(
        '/users/me',
        this.auth.token
      ).then((resp) => {
        this.auth = {
          token: this.auth.token,
          firstname: resp.user.firstName,
          lastname: resp.user.lastName,
          email: resp.user.email,
          id: resp.user._id,
          authenticated: true
        }
      })
    },

    update() {
      try {
        this.loading = true
        this.error = ''
        // TODO: Update user data in the backend
        throw new Error(this.$t('notImplemented'))
        // this.fetchUserData()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
