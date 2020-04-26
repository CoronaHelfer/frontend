<template>
  <q-page>
    <body>
      <article>
        <div v-show="error" class="error">{{ error }}</div>
        <q-splitter v-model="splitterModel">
          <template v-slot:before>
            <q-avatar
              class="avatar"
              color="grey-3"
              text-color="white"
              size="100px"
            >
              {{ auth.firstname[0] }}
            </q-avatar>
            <q-tabs v-model="tab" vertical>
              <q-tab :name="Tabs.Profile" :label="$t('profile')" />
              <q-tab :name="Tabs.Entries" :label="$t('user.myRequests')" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels v-model="tab" vertical>
              <q-tab-panel :name="Tabs.Profile">
                <div class="profile-header">
                  <h2 class="welcome-heading">
                    {{ $t('welcome') }}, {{ auth.firstname }} {{ auth.lastname }}
                  </h2>
                </div>

                <div class="row">
                  <div class="col">
                    <q-input
                      dense
                      borderless
                      v-model="firstname"
                      :label="$t('firstName')"
                      class="input"
                    ></q-input>
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      borderless
                      v-model="lastname"
                      :label="$t('lastName')"
                      class="input"
                    ></q-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <q-input
                      dense
                      borderless
                      v-model="street"
                      :label="$t('address.street')"
                      class="input"
                    ></q-input>
                  </div>
                  <div class="col-3">
                    <q-input
                      dense
                      borderless
                      v-model="streetNumber"
                      :label="$t('address.number')"
                      class="input"
                    ></q-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-3">
                    <q-input
                      dense
                      borderless
                      v-model="zip"
                      :label="$t('address.zipcode')"
                      class="input"
                    ></q-input>
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      borderless
                      v-model="city"
                      :label="$t('address.city')"
                      class="input"
                    ></q-input>
                  </div>
                </div>

                <q-btn
                  class="submit-button"
                  :label="$t('save')"
                  :loading="loading"
                  @click="update">
                </q-btn>
              </q-tab-panel>

              <q-tab-panel :name="Tabs.Entries">
                <my-requests />
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </article>
    </body>
  </q-page>
</template>

<style lang="sass" scoped>
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

.input
  margin: 10px 10px
  background-color: #fdf4eb
  border-radius: 12px
  border-bottom: 0
  padding: 10px

.error
  background: RED
  color: WHITE
  padding: 10px 25px
  margin-bottom: 15px
  border-radius: 12px
  font-size: 13px

h2
  text-transform: none
  font-size: 2.3rem
  font-weight: bold
  color: #EF7D18

.profile-header
  margin-left: 12px

.submit-button
  margin-left: 10px
  margin-top: 6px
  border-radius: 12px

.avatar
  margin-left: 30px
  margin-bottom: 15px

.q-tab-panel
  padding: 0
  padding-left: 16px
</style>

<script>
import { callApi } from '../../api/requests'
import MyRequests from '../components/MyRequests'

const Tabs = {
  Profile: 'Profile',
  Entries: 'Entries'
}

export default {
  components: {
    MyRequests
  },

  data() {
    return {
      Tabs,

      firstname: '',
      lastname: '',
      street: '',
      streetNumber: '',
      zip: '',
      city: '',
      error: '',

      loading: false,
      tab: Tabs.Profile,
      splitterModel: 20
    }
  },

  computed: {
    auth: {
      get() {
        return Object.assign({}, this.$store.state.auth.data)
      },
      set(value) {
        this.$store.commit('auth/updateData', value)
      }
    }
  },

  mounted() {
    this.firstname = this.auth.firstname
    this.lastname = this.auth.lastname
    this.street = this.auth.street
    this.streetNumber = this.auth.streetNumber
    this.zip = this.auth.zip
    this.city = this.auth.city
  },

  methods: {
    async fetchUserData() { // TODO: Deduplicate this request
      await callApi(
        '/users/me',
        this.auth.token
      ).then((resp) => {
        this.auth = {
          token: this.auth.token,
          firstname: resp.user.firstName,
          lastname: resp.user.lastName,
          email: resp.user.email,
          id: resp.user._id,
          authenticated: true
        }
      })
    },

    update() {
      try {
        this.loading = true
        this.error = ''
        // TODO: Update user data in the backend
        throw new Error(this.$t('notImplemented'))
        // this.fetchUserData()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
