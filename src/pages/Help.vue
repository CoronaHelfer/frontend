<template>
  <q-page class="wrapper">
    <article>
      <div v-show="isUserAddressMissing" class="banner q-my-md">
        <q-banner rounded inline-actions>
          {{ $t('noAddress') }}
          <template v-slot:action>
            <q-btn flat color="white" to="/profile" :label="$t('goSettings')" />
          </template>
        </q-banner>
      </div>
      <div class="row wrap q-mb-md">
        <div class="col-xs-12 col-md-6 q-pa-sm">
          <q-input
            outlined
            color="secondary"
            v-model="query.address"
            :label="$t('searchForm.address')"
          >
            <template v-slot:append>
              <q-icon class="icon" name="room" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-md-6 q-pa-sm">
          <q-select
            outlined
            color="secondary"
            :options="radii"
            :option-label="(item) => `${item} km`"
            v-model="query.distance"
            :label="$t('searchForm.radius')"
          />
        </div>
      </div>
      <div class="row col-xs-12 col-md-6 q-pa-sm" v-if="categorySelection">
        <q-chip
          v-for="category in categories"
          :key="category._id"
          :selected.sync="categorySelection[category._id]"
          color="secondary"
          text-color="white"
          size="md"
        >
          {{ category.name }}
        </q-chip>
      </div>
      <div class="row col-xs-12 col-md-6 q-pa-sm">
        <q-btn rounded size="md" class="q-ma-xs" @click="fetchRequests">
          {{ $t('searchForm.search') }}
        </q-btn>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
    </article>
    <Request
      v-for="request in requests"
      v-bind:key="request._id"
      :user="{ firstName: 'Anonym', image: undefined }"
      :request="request"
      :onClick="openPopUp"
    />
    <article v-if="requests.length === 0">
      {{ $t('noRequests') }}
    </article>
    <Offer
      :isDialogOpen="isDialogOpen"
      :requestId="selectedRequest"
      @dialogClosed="closePopUp"
    />
  </q-page>
</template>

<style lang="sass" scoped>
article
  padding-top: 30px
  margin: 20px auto 0
  max-width: 800px
  .q-banner
    background-color: $accent
</style>

<script>
import Vue from 'vue'
import Request from '../components/Request'
import Offer from '../components/Offer'
import { callApi } from '../../api/requests'

export default {
  components: {
    Request,
    Offer
  },

  data() {
    return {
      error: '',
      loading: true,
      requests: [],
      selectedRequest: undefined,
      isDialogOpen: false,
      categories: [],
      radii: [5, 10, 25, 50, 75, 100],
      query: {
        categoryIds: [],
        address: '',
        distance: 5
      },
      categorySelection: {},
      isUserAddressMissing: false
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

  async mounted() {
    if (this.$route.query && this.$route.query.address) {
      Vue.set(this.query, 'address', this.$route.query.address)
    }

    console.log('This Auth', this.auth)

    if (this.auth.address.city === '' || this.auth.address.zip === '') {
      this.isUserAddressMissing = true
    } else {
      this.query.address = `${this.auth.address.number} ${this.auth.address.street} ${this.auth.address.zipcode} ${this.auth.address.city}`
    }

    this.loading = true
    await this.loadCategories()
    await this.fetchRequests()
  },

  methods: {
    async fetchRequests() {
      try {
        this.error = ''
        this.loading = true
        this.query.categoryIds = Object.entries(this.categorySelection)
          .filter(([key, value]) => !!value)
          .map(([key, value]) => key)
          .join(',')

        const queryString = new URLSearchParams(this.query)

        const response = await callApi(`/publicRequest?${queryString}`)

        if (
          response.status === 400 &&
          response.message === 'positionNotFound'
        ) {
          this.error = this.$t(response.message)
          this.requests = []

          return
        }

        this.requests = response.result || []
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async loadCategories() {
      try {
        const categories = await callApi('/category')

        if (categories.error || !categories.result) {
          console.error('Error while fetching categories')
          throw new Error(this.$t('somethingWentWrong'))
        }

        this.categories = categories.result
        this.categorySelection = this.categories.reduce(
          (accumulator, current) => {
            accumulator[current._id] = false
            return accumulator
          },
          {}
        )
      } catch (e) {
        this.error = e
      }
    },

    openPopUp(requestId) {
      if (this.auth.authenticated) {
        this.selectedRequest = requestId
        this.isDialogOpen = true
      } else {
        this.$router.push('login')
      }
    },

    closePopUp() {
      this.isDialogOpen = false
    }
  }
}
</script>
