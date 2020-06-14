<template>
  <div>
    <h2 class="colored-heading">{{ $t('myRequests') }}</h2>
    <div v-if="error !== ''" class="error">{{ error }}</div>
    <div class="row justify-center">
      <q-spinner v-if="loading" color="secondary" size="5em" />
    </div>
    <p v-if="!loading && requests.length === 0">
      {{ $t('noRequestsCreated') }}
    </p>
    <MyRequest
      v-else
      v-for="request in requests"
      v-bind:key="request._id"
      :request="request"
      @reloadRequests="fetchRequests"
      @error="(message) => (error = message)"
    />
  </div>
</template>

<style lang="sass" scoped>
.colored-heading
  display: inline
  line-height: 1.2
</style>

<script>
import apiService from '../services/api'
import MyRequest from '../components/MyRequest'
import { clone } from 'ramda'

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
    auth() {
      return clone(this.$store.state.auth)
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

        const requests = await apiService.get('/request', this.auth.token)

        this.requests = requests.data.result || []
      } catch (error) {
        console.error(error)
        this.error = this.$t('somethingWentWrong')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
