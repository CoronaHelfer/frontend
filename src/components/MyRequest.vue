<template>
  <q-card class="q-my-lg">
    <q-card-section>
      <div class="row">
        <div class="col">
          <header v-if="!editMode">
            <h2>{{ request.title }}</h2>
          </header>
          <q-input :label="$t('title')" v-model="request.title" v-else />

          <p v-if="!editMode">
            <strong>{{ $t('category') }}:</strong> {{ $t(`categoryNameByInternalId.${request.category.internal_id}`) }}
          </p>
          <q-select
            v-else
            v-model="request.category"
            :options="categories"
            :label="$t('category')"
            option-value="_id"
            :option-label="item => $t(`categoryNameByInternalId.${item.internal_id}`)"
            map-options
            bg-color="accent"
          />

          <p v-if="!editMode">
            <strong>{{ $t('request') }}:</strong> {{ request.description }}
          </p>
          <div v-else>
            <q-input
              class="q-mb-sm"
              type="textarea"
              :label="$t('request')"
              v-model="request.description"
            />
            <q-btn color="secondary" :label="$t('send')" @click="saveRequest" />
          </div>
        </div>

        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item>
                  <q-btn
                    flat
                    icon-right="fas fa-pencil-alt"
                    :label="this.$t('edit')"
                    class="full-width"
                    v-on:click="editRequest"
                  ></q-btn>
                </q-item>
                <q-item>
                  <q-btn
                    flat
                    icon-right="fas fa-trash"
                    :label="this.$t('delete')"
                    class="full-width"
                    :loading="loading"
                    v-on:click="deleteRequest"
                  ></q-btn>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>
    <q-card-section align="right" class="text-grey-7">
      {{ end_date }}
    </q-card-section>
    <q-card-actions>
      <q-space />
      <q-btn
        class="card-action-button"
        color="secondary"
        v-if="request.helper.length"
        @click="showOffersPage"
      >
        {{ request.helper.length }} {{ $tc('offers', request.helper.length) }}
      </q-btn>
    </q-card-actions>
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
import { clone } from 'ramda'
import apiService from '../services/api'

export default {
  props: {
    request: Object
  },

  data() {
    return {
      loading: false,
      editMode: false,
      categories: []
    }
  },

  computed: {
    auth: {
      get() {
        return clone(this.$store.state.auth)
      },
      set(val) {
        this.$store.commit('auth/updateData', val)
      }
    },

    end_date() {
      return date.formatDate(new Date(this.request.time_end), 'DD.MM.YYYY')
    }
  },

  async mounted() {
    const response = await apiService.get('/category')
    this.categories = response.data.result
  },

  methods: {
    editRequest() {
      this.editMode = true
    },

    async saveRequest() {
      await apiService.put('/request', this.request, this.auth.token)
      this.editMode = false
    },

    async deleteRequest() {
      try {
        this.loading = true
        this.$emit('error', '')

        await apiService.delete(
          '/request',
          { requestId: this.request._id },
          this.auth.token
        )
      } catch (error) {
        console.error(error)

        this.$emit('error', this.$t('somethingWentWrong'))
      } finally {
        this.$emit('reloadRequests')
        this.loading = false
      }
    },

    showOffersPage() {
      this.$router.push({
        name: 'Offers',
        params: { request: this.request }
      })
    }
  }
}
</script>
