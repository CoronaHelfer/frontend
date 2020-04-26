<template>
  <div>
    <h2>{{ $t('myRequests') }}</h2>
    <div v-if="error !== ''" class="error">{{ error }}</div>
    <div class="row justify-center">
      <q-spinner v-if="loading" color="secondary" size="5em" />
    </div>
    <p v-if="!loading && ownRequests.length === 0">
      {{ $t('noRequestsCreated') }}
    </p>
    <MyRequest
      v-else
      v-for="request in ownRequests"
      v-bind:key="request._id"
      :request="request"
      @reloadRequests="fetchRequests"
      @error="(message) => (error = message)"
    />
  </div>
</template>

<style lang="sass" scoped>
h2
  text-transform: none
  font-size: 2.3rem
  font-weight: bold
  color: #EF7D18
</style>

<script>
import { callApi } from '../../api/requests'
import MyRequest from '../components/MyRequest'

export default {
  name: 'my-requests',

  components: {
    MyRequest
  },

  data() {
    return {
      requests: [],
      loading: false,
      error: ''
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
    },

    ownRequests: function() {
      return this.requests.filter(function(request) {
        return request.created_by === this.auth.id
      }, this)
    }
  },

  mounted() {
    if (!this.auth.authenticated) {
      this.$router.push('/login')
    }
    this.fetchRequests()
  },

  methods: {
    async fetchRequests() {
      try {
        this.loading = true
        this.error = ''
        const requests = await callApi(
          '/request',
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
