<template>
  <article>
    <header>
      <h2>{{request.title}}</h2>
    </header>

    <div class="row">
    <div class="col">
      <p>
        <strong>{{$t('category')}}:</strong> {{request.category.name}}
      </p>
      <p>
        <strong>{{$t('request')}}:</strong> {{request.description}}
      </p>
    </div>
      <div class="col">
        <q-btn
          round
          class="margin-box"
          color="negative"
          icon="fas fa-trash"
          :loading="loading"
          v-on:click="deleteRequest"
        />
      </div>
    </div>
  </article>
</template>

<style lang="sass" scoped>
header
  align-items: center
  display: flex
  justify-content: flex-start
  text-align: center

.intro
  display: flex
  flex-direction: column
  text-align: left
</style>

<script>
import { callApi } from '../../api/requests'

export default {
  props: {
    request: Object
  },

  data() {
    return {
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
    }
  },

  methods: {
    async deleteRequest() {
      try {
        this.loading = true
        this.error = ''
        await callApi(
          this.$q.localStorage.getItem('server') + 'request',
          this.auth.token,
          {
            requestId: this.request._id
          },
          'DELETE'
        )
      } catch (err) {
        this.error = err
        this.loading = false
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
