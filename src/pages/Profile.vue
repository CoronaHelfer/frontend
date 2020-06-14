<template>
  <q-page>
    <body>
      <article>
        <div v-show="error" class="error">{{ error }}</div>
        <q-splitter v-model="splitterModel" :horizontal="$q.screen.lt.md">
          <template v-slot:before>
            <q-tabs v-model="tab" vertical>
              <q-tab :name="Tabs.Profile" :label="$t('profile')" />
              <q-tab
                :disabled="!auth.verified"
                :name="Tabs.Entries"
                :label="$t('user.myRequests')"
              />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels v-model="tab" vertical>
              <q-tab-panel :name="Tabs.Profile">
                <div class="profile-header">
                  <h2 class="colored-heading">
                    {{ $t('welcome') }}
                  </h2>
                  <div v-if="!auth.verified">
                    <h3>{{ $t('unverified') }}</h3>
                    <p>{{ $t('restrictedAccess') }}</p>
                    <q-btn
                      v-if="!verificationEmailSentAgain"
                      :loading="resending"
                      size="md"
                      class="q-mb-md"
                      color="primary"
                      :label="$t('resendVerificationEmail')"
                      @click="resendVerificationEmail"
                    />
                    <div v-if="verificationEmailSentAgain">
                      {{ $t('checkInbox') }}
                    </div>
                  </div>
                </div>

                <div v-show="updated" class="success">{{ $t('profileUpdated') }}</div>

                <q-form ref="profileForm">
                  <div class="row wrap">
                    <div class="col-xs-12 col-md-6">
                      <q-input
                        dense
                        borderless
                        v-model="user.firstName"
                        :label="$t('firstName')"
                        class="input"
                        disabled
                      ></q-input>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <q-input
                        dense
                        borderless
                        v-model="user.lastName"
                        :label="$t('lastName')"
                        class="input"
                        disabled
                      ></q-input>
                    </div>
                  </div>

                  <div class="row wrap">
                    <div class="col-xs-8 col-md-9">
                      <q-input
                        dense
                        borderless
                        v-model="user.address.street"
                        :label="$t('address.street')"
                        class="input"
                        :rules="[(val) => !!val || $t('emptyField')]"
                      ></q-input>
                    </div>
                    <div class="col-xs-4 col-md-3">
                      <q-input
                        dense
                        borderless
                        v-model="user.address.number"
                        :label="$t('address.number')"
                        class="input"
                        :rules="[(val) => !!val || $t('emptyField')]"
                      ></q-input>
                    </div>
                  </div>

                  <div class="row wrap">
                    <div class="col-xs-4 col-md-3">
                      <q-input
                        dense
                        borderless
                        v-model="user.address.zipcode"
                        :label="$t('address.zipcode')"
                        class="input"
                        :rules="[(val) => !!val || $t('emptyField')]"
                      ></q-input>
                    </div>
                    <div class="col-xs-8 col-md-9">
                      <q-input
                        dense
                        borderless
                        v-model="user.address.city"
                        :label="$t('address.city')"
                        class="input"
                        :rules="[(val) => !!val || $t('emptyField')]"
                      ></q-input>
                    </div>
                  </div>
                </q-form>

                <q-btn
                  class="submit-button"
                  size="lg"
                  :label="$t('save')"
                  :loading="loading"
                  @click="update"
                >
                </q-btn>
              </q-tab-panel>

              <q-tab-panel :name="Tabs.Entries">
                <my-requests v-if="auth.verified" />
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
  margin: 16px
  border-radius: 12px
  font-size: 13px

.success
  background: GREEN
  color: WHITE
  padding: 10px 25px
  margin: 12px
  border-radius: 12px
  font-size: 13px

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
import MyRequests from '../components/MyRequests'
import { clone } from 'ramda'
import apiService from '../services/api'

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
      tab: Tabs.Profile,
      user: {
        firstName: '',
        lastName: '',
        address: {
          number: '',
          street: '',
          zipcode: '',
          city: ''
        }
      },
      error: '',
      loading: false,
      resending: false,
      verificationEmailSentAgain: false,
      splitterModel: 20,
      updated: false
    }
  },

  computed: {
    auth() {
      return clone(this.$store.state.auth)
    }
  },

  async mounted() {
    if (this.auth.authenticated) {
      this.user = this.auth
    } else {
      this.$router.push('login')
    }
  },

  methods: {
    async update() {
      try {
        if (!(await this.$refs.profileForm.validate())) {
          return
        }

        this.loading = true
        this.error = ''

        const response = await apiService.put(
          '/users/me',
          {
            street_nr: this.user.address.number,
            street: this.user.address.street,
            plz: this.user.address.zipcode,
            city: this.user.address.city
          },
          this.auth.token
        )

        this.$store.commit('auth/setUser', {
          user: {
            firstName: response.data.result.firstName,
            lastName: response.data.result.lastName,
            email: response.data.result.email,
            id: response.data.result._id,
            verified: response.data.result.verified,
            address: {
              number: response.data.result.address.street_nr || '',
              street: response.data.result.address.street || '',
              zipcode: response.data.result.address.plz || '',
              city: response.data.result.address.city || ''
            }
          }
        })

        this.updated = true
      } catch (error) {
        console.error(error)
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
    },

    async resendVerificationEmail() {
      try {
        this.resending = true

        await apiService.get('/verify/resend', this.auth.token)

        this.verificationEmailSentAgain = true
      } catch (error) {
        console.error(error)
      } finally {
        this.resending = false
      }
    }
  }
}
</script>
