<template>
  <q-page>
    <body>
      <q-linear-progress :indeterminate="loading" color="secondary" />
      <article>
        <div class="row wrap q-mb-md">
          <div class="col-xs-12 col-md-6 q-pa-sm">
            <q-input
              outlined
              color="secondary"
              v-model="query.zipcode"
              :label="$t('searchForm.zipcode')"
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
              v-model="query.radius"
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
      loading: true,
      requests: [],
      selectedRequest: undefined,
      isDialogOpen: false,
      categories: [],
      radii: [5, 10, 25, 50, 75, 100],
      query: {
        categoryIds: [],
        zipcode: undefined,
        radius: 5
      },
      categorySelection: {}
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
    if (this.$route.query && this.$route.query.zipcode) {
      Vue.set(this.query, 'zipcode', this.$route.query.zipcode)
    }

    this.loading = true
    await this.loadCategories()
    await this.fetchRequests()
  },

  methods: {
    async fetchRequests() {
      try {
        this.loading = true
        this.query.categoryIds = Object.entries(this.categorySelection)
          .filter(([key, value]) => !!value)
          .map(([key, value]) => key)
          .join(',')

        const queryString = new URLSearchParams(this.query)

        const response = await callApi(`/publicRequest?${queryString}`)
        console.log(response.result)
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
      this.selectedRequest = requestId
      this.isDialogOpen = true
    },

    closePopUp() {
      this.isDialogOpen = false
    }
  }
}
</script>
