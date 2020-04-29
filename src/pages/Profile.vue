<template>
  <q-page>
    <body>
      <article>
        <div v-show="error" class="error">{{ error }}</div>
        <q-splitter v-model="splitterModel" :horizontal="$q.screen.lt.md">
          <template v-slot:before>
            <!-- <input
              id="imageInput"
              ref="imageInput"
              name="imageInput"
              type="file"
              @change="encodeImageFileAsURL()"
            />
            <q-avatar
              class="avatar"
              color="grey-3"
              text-color="white"
              size="100px"
              @click="clickHiddenFileInput"
            >
              <img v-if="picture" :src="picture">
              <span v-else>{{ auth.firstname[0] }}</span>
            </q-avatar> -->
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
                    {{ $t('welcome') }}
                  </h2>
                </div>

                <div class="row wrap">
                  <div class="col-xs-12 col-md-6">
                    <q-input
                      dense
                      borderless
                      v-model="firstname"
                      :label="$t('firstName')"
                      class="input"
                    ></q-input>
                  </div>
                  <div class="col-xs-12 col-md-6">
                    <q-input
                      dense
                      borderless
                      v-model="lastname"
                      :label="$t('lastName')"
                      class="input"
                    ></q-input>
                  </div>
                </div>

                <div class="row wrap">
                  <div class="col-xs-4 col-md-3">
                    <q-input
                      dense
                      borderless
                      v-model="streetNumber"
                      :label="$t('address.number')"
                      class="input"
                    ></q-input>
                  </div>
                  <div class="col-xs-8 col-md-9">
                    <q-input
                      dense
                      borderless
                      v-model="street"
                      :label="$t('address.street')"
                      class="input"
                    ></q-input>
                  </div>
                </div>

                <div class="row wrap">
                  <div class="col-xs-4 col-md-3">
                    <q-input
                      dense
                      borderless
                      v-model="zip"
                      :label="$t('address.zipcode')"
                      class="input"
                    ></q-input>
                  </div>
                  <div class="col-xs-8 col-md-9">
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
                  size="lg"
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
  margin: 6px 10px
  border-radius: 12px

.avatar
  margin-left: 30px
  margin-bottom: 15px
  cursor: pointer

.q-tab-panel
  padding-left: 0 16px

#imageInput
  display: none
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
      // picture: undefined,

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

  async mounted() {
    await this.fetchUserData()

    this.firstname = this.auth.firstname
    this.lastname = this.auth.lastname
    this.street = this.auth.street
    this.streetNumber = this.auth.streetNumber
    this.zip = this.auth.zip
    this.city = this.auth.city
    // this.picture = this.auth.picture
  },

  methods: {
    async fetchUserData() {
      await callApi(
        '/users/me',
        this.auth.token
      ).then((resp) => {
        this.auth = {
          token: this.auth.token,
          firstname: resp.user.firstName,
          lastname: resp.user.lastName,
          street: resp.user.address.street,
          streetNumber: resp.user.address.street_nr,
          city: resp.user.address.city,
          zip: resp.user.address.plz,
          email: resp.user.email,
          id: resp.user._id,
          authenticated: true
          // picture: resp.user.picture,
        }
      })
    },

    async update() {
      try {
        this.loading = true
        this.error = ''

        await callApi(
          '/users/me',
          this.auth.token,
          {
            street_nr: this.streetNumber,
            street: this.street,
            plz: this.zip,
            city: this.city
            // picture: this.picture
          },
          'PATCH'
        )
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    // unused until backend implements a storage solution
    clickHiddenFileInput() {
      document.querySelector('#imageInput').click()
    },

    // unused until backend implements a storage solution
    encodeImageFileAsURL() {
      this.error = ''

      if (this.$refs.imageInput.files[0]) {
        const image = this.$refs.imageInput.files[0]
        console.log(image)
        const allowedImageTypes = ['image/png', 'image/jpg', 'image/jpeg']

        if (!allowedImageTypes.includes(image.type)) {
          this.error = 'Dieser Dateityp ist nicht zulässig. Unterstützte Typen: png, jpg, jpeg'
          return
        }

        if (image.size > 1000000) {
          this.error = 'Das Bild überschreitet die maximale Bildgröße. Maximum: 1MB'
          return
        }

        const fileReader = new FileReader()

        fileReader.addEventListener('load', () => {
          this.picture = fileReader.result
        })

        fileReader.readAsDataURL(this.$refs.imageInput.files[0])
      }
    }
  }
}
</script>
