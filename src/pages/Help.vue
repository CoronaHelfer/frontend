<template>
  <q-page>
    <body>
      <article>
        <div class="row wrap q-mb-md">
          <div class="col-6 q-px-xs">
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
          <div class="col-6 q-px-xs">
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
        <div class="row wrap">
          <q-chip
            v-for="category in categories"
            :key="category.id"
            :selected.sync="categorySelection[category.id]"
            color="secondary"
            text-color="white"
            size="md"
          >
            {{ category.label }}
          </q-chip>
        </div>
      </article>
      <Request
        v-for="request in foreignRequests"
        v-bind:key="request._id"
        :user="{ firstName: 'Anonym', image: undefined }"
        :request="request"
        :onClick="openPopUp"
      />
      <article v-if="foreignRequests.length === 0">
        {{ $t('noRequests') }}
      </article>
      <Offer :isDialogOpen="isDialogOpen" :requestId="selectedRequest" />
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
import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins

export default {
  components: {
    Request,
    Offer
  },

  data() {
    return {
      requests: [],
      selectedRequest: undefined,
      isDialogOpen: false,
      categories: [
        { label: 'Kurierdienste', id: 1 },
        { label: 'Warenleistungen', id: 2 },
        { label: 'Bildung', id: 3 },
        { label: 'Soziales & Gemeinschaft', id: 4 }
      ],
      radii: [5, 10, 25, 50, 75, 100],
      query: {
        categoryIds: [],
        zipcode: undefined,
        radius: 5
      },
      categorySelection: {
        1: false,
        2: false,
        3: false,
        4: false
      }
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

    foreignRequests: function() {
      return this.requests.filter(function(request) {
        return request.created_by._id !== this.auth.id
      }, this)
    }
  },

  async mounted() {
    if (this.$route.query && this.$route.query.zipcode) {
      Vue.set(this.query, 'zipcode', this.$route.query.zipcode)
    }

    await this.fetchRequests()
  },

  methods: {
    async fetchRequests(longitude, latitude) {
      try {
        const queryString = new URLSearchParams(this.query)

        const response = await callApi(`/publicRequest?${queryString}`)

        this.requests = response.result
      } catch (err) {
        console.error(err)
      }
    },

    openPopUp(requestId) {
      this.selectedRequest = requestId
      this.isDialogOpen = true
    }
  },

  beforeDestroy() {
    Geolocation.clearWatch(this.geoId)
  }
}
</script>
