<template>
  <q-card class="card bg-red-1">
    <q-card-section>
      <div class="row">
        <div class="col">
          <header>
            <h2>{{request.title}}</h2>
          </header>
          <p>
            <strong>{{$t('category')}}:</strong> {{request.category.name}}
          </p>
          <p>
            <strong>{{$t('request')}}:</strong> {{request.description}}
          </p>
        </div>

        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item>
                  <q-btn
                    icon-right="fas fa-pencil-alt"
                    label="Bearbeiten X"
                    class="full-width"
                    v-on:click="editRequest"></q-btn>
                </q-item>
                <q-item>
                  <q-btn
                    icon-right="fas fa-trash"
                    label="Löschen X"
                    class="full-width"
                    :loading="loading"
                    v-on:click="deleteRequest"></q-btn>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>
    <q-card-section align="right" class="text-grey-7">
      {{end_date}}
    </q-card-section>
  </q-card>
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

.card
  border-radius: 10px
  padding: 5px
  margin: 20px 40px

h2, strong
  color: $primary

.q-item
  padding: 0
</style>

<script>
import { date } from 'quasar'
import { callApi } from '../../api/requests'

export default {
  props: {
    request: Object
  },

  data() {
    return {
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
    },

    end_date() {
      return date.formatDate(new Date(this.request.time_end), 'DD.MM.YYYY')
    }
  },

  methods: {
    async editRequest() {
      this.$emit('error', this.$t('notImplemented'))
    },

    async deleteRequest() {
      try {
        this.loading = true
        this.$emit('error', '')

        await callApi(
          this.$q.localStorage.getItem('server') + 'request',
          this.auth.token,
          {
            requestId: this.request._id
          },
          'DELETE'
        )
        this.$emit('reloadRequests')
      } catch (err) {
        console.error(err)
        this.$emit('error', this.$t('somethingWentWrong'))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
