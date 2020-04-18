<template>
  <q-page>
    <header>
      <h1>{{$t('myRequests')}}</h1>
    </header>

    <body>
      <article>
        <div v-if="error !== ''" class="error">{{error}}</div>
        <div class="row justify-center">
          <q-spinner
            v-if="loading"
            color="secondary"
            size="5em"
          />
        </div>
        <p v-if="!loading && ownRequests.length === 0">{{$t('noRequestsCreated')}}</p>
        <MyRequest
          v-else
          v-for="request in ownRequests"
          v-bind:key="request._id"
          :request="request"
          @reloadRequests="fetchRequests"
          @error="(message) => error = message"/>
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
      requests: [],
      loading: false,
      error: ''
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
        this.loading = true
        this.error = ''
        const requests = await callApi( // TODO: deduplicate this function
          this.$q.localStorage.getItem('server') + 'request',
          this.auth.token
        )
        this.requests = requests.result
      } catch (err) {
        console.error(err)
        this.error = this.$t('somethingWentWrong')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
