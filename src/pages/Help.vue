<template>
  <q-page>
    <header>
      <h1>Gesuche</h1>
    </header>

    <body>
    <Request
      v-for="request in foreignRequests"
      v-bind:key="request._id"
      :user="{ firstName: 'Anonym', image: undefined }"
      :request="request"
      :onClick="openPopUp"/>
    <article v-if="foreignRequests.length === 0">Momentan gibt es keine Gesuche!</article>
    <Offer
      :isDialogOpen="isDialogOpen"
      :requestId="selectedRequest"
    />
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

    a
      text-decoration: none

    h4
      text-transform: uppercase
      margin: 0 0 30px 0

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

      h5
        color: $secondary
        text-transform: uppercase
        font-weight: 600
        margin: 20px 0
</style>

<script>
import Request from '../components/Request'
import Offer from '../components/Offer'
import { callApi } from '../../api/requests'
import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins

export default {
  components: {
    Request,
    Offer
  },

  data () {
    return {
      requests: [],
      selectedRequest: undefined,
      isDialogOpen: false,
      position: ''
    }
  },

  computed: {
    auth: {
      get () {
        return Object.assign({}, this.$store.state.auth.data)
      },
      set (val) {
        this.$store.commit('auth/updateData', val)
      }
    },

    foreignRequests: function () {
      return this.requests.filter(function (request) {
        return request.created_by._id !== this.auth.id
      }, this)
    }
  },

  mounted () {
    this.getCurrentPosition()
    this.geoId = Geolocation.watchPosition({}, (position, err) => {
      this.position = position
      this.fetchRequests()
    })
  },

  methods: {
    getCurrentPosition() {
      Geolocation.getCurrentPosition().then(position => {
        this.position = position
      })
    },

    async fetchRequests() {
      try {
        const headers = new Headers()
        headers.append('position', this.position.coords.longitude)
        headers.append('position', this.position.coords.latitude)

        const response = await callApi(
          this.$q.localStorage.getItem('server') + 'publicRequest',
          undefined,
          undefined,
          undefined,
          headers
        )
        this.requests = response.result
      } catch (err) {
        console.error(err)
      }
    },

    openPopUp (requestId) {
      this.selectedRequest = requestId
      this.isDialogOpen = true
    }
  },

  beforeDestroy () {
    Geolocation.clearWatch(this.geoId)
  }
}
</script>
