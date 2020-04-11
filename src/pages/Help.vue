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

export default {
  components: {
    Request,
    Offer
  },

  data () {
    return {
      requests: [],
      selectedRequest: undefined,
      isDialogOpen: false
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
    if (this.auth.authenticated) {
      this.fetchRequests()
    } else {
      this.$router.push('/login')
    }
  },

  methods: {
    async fetchRequests () {
      try {
        await callApi( // TODO(jj): remove this
          this.$q.localStorage.getItem('server') + 'request/helper',
          this.auth.token,
          {
            offerText: 'Lorem ipsum',
            requestId: '5e91e37f4134be001416abfc'
          },
          'POST'
        )

        const result = await callApi(
          this.$q.localStorage.getItem('server') + 'publicRequest',
          '',
          {
            'address.plz': '19395', // TODO: use actual values via geocoding
            'address.city': 'Plau',
            'address.street': 'Hans-Sachs-Ring',
            'address.street_nr': '5'
          },
          'GET'
        )
        this.requests = result.result
      } catch (err) {
        console.error(err)
      }
    },

    openPopUp (requestId) {
      this.selectedRequest = requestId
      this.isDialogOpen = true
    }
  }
}
</script>
