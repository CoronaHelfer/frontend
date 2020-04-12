<template>
  <q-card>
    <q-card-section>
      <q-badge v-if="request.helper.length" color="red" floating>{{request.helper.length}}</q-badge>
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
                <q-item v-if="request.helper.length">
                  <q-btn
                    flat
                    icon-right="mail"
                    label="Nachrichten"
                    class="full-width"
                    :loading="loading"
                    v-on:click="showOffersPage()"></q-btn>
                </q-item>
                <q-item>
                  <q-btn
                    flat
                    icon-right="fas fa-pencil-alt"
                    label="Bearbeiten X"
                    class="full-width"
                    v-on:click="editRequest"></q-btn>
                </q-item>
                <q-item>
                  <q-btn
                    flat
                    icon-right="fas fa-trash"
                    label="Löschen"
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

.q-card
  border-radius: 10px
  padding: 5px
  margin: 20px 40px
  background-color: rgb(254, 246, 239)

h2, strong
  color: $primary

.q-item
  padding: 0

.q-btn
  color: $primary
  background-color: initial

a
  font-size: 14px
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
    },

    showOffersPage() {
      this.$q.localStorage.set('offers', this.request.helper)
      this.$router.push('offers')
    }
  }
}
</script>
