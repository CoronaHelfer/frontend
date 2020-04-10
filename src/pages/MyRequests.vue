<template>
  <q-page>
    <header>
      <h1>{{$t('myRequests')}}</h1>
    </header>

    <body>
      <MyRequest
        v-for="request in ownRequests"
        v-bind:key="request._id"
        :request="request"/>
      <article v-if="ownRequests.length === 0">{{$t('noRequestsCreated')}}</article>
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

    h5
      color: $secondary
      text-transform: uppercase
      font-weight: 600
      margin: 20px 0
</style>

<script>
import { callApi } from '../../api/requests'
import MyRequest from '../components/MyRequest'

export default {
  components: {
    MyRequest
  },

  data () {
    return {
      requests: []
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

    ownRequests: function () {
      return this.requests.filter(function (request) {
        return request.created_by === this.auth.id
      }, this)
    }
  },

  mounted () {
    if (!this.auth.authenticated) {
      this.$router.push('/login')
    }
    this.fetchRequests()
  },

  methods: {
    async fetchRequests () {
      try {
        const result = await callApi( // TODO: deduplicate this function
          this.$q.localStorage.getItem('server') + 'request',
          this.auth.token
        )
        this.requests = result.result
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
