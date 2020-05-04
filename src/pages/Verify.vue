<template>
  <q-page>
    <body>
      <div class="window-height row justify-center items-center">
        <q-circular-progress
          v-if="verifying"
          :indeterminate="verifying"
          size="100px"
          :thickness="0.6"
          color="secondary"
          center-color="primary"
          class="q-ma-md"
        />
        <q-card v-else flat bordered class="q-pa-xl">
          <q-card-section v-if="verified">
            <h1 class="q-mt-none q-mb-xl">
              {{ $t('accountVerified') }}
            </h1>
            <q-btn
              size="lg"
              class="q-mr-md"
              color="secondary"
              to="/get-help"
              :label="$t('getHelp')"
            />
            <q-btn size="lg" color="primary" to="/help" :label="$t('help')" />
          </q-card-section>
          <q-card-section v-if="!verified">
            <h1 class="q-mt-none q-mb-xl">
              {{ $t('accountVerificationFailed') }}
            </h1>
            <q-btn
              v-if="!verificationEmailSentAgain"
              :loading="resending"
              size="lg"
              class="q-mb-md"
              color="primary"
              :label="$t('resendVerificationEmail')"
              @click="resendVerificationEmail"
            />
            <div v-if="verificationEmailSentAgain">
              {{ $t('checkInbox') }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </body>
  </q-page>
</template>

<script>
import Vue from 'vue'
import { callApi } from '../../api/requests'

export default {
  data() {
    return {
      error: '',
      resending: false,
      verifying: false,
      verified: false,
      verificationEmailSentAgain: false
    }
  },

  computed: {
    auth() {
      return Object.assign({}, this.$store.state.auth.data)
    }
  },

  async mounted() {
    if (!this.auth.authenticated) {
      this.$router.push('login')
      return
    }

    if (!this.$route.query || !this.$route.query.key) {
      this.$router.push('Error404')
      return
    }

    this.key = this.$route.query.key
    this.verifying = true

    setTimeout(async () => await this.verifyEmail(), 1000)
  },

  methods: {
    async verifyEmail() {
      try {
        this.error = ''
        this.verifying = true

        const queryString = new URLSearchParams({ key: this.key })

        const response = await callApi(
          `/verify?${queryString}`,
          this.auth.token
        )

        this.verifying = false

        if (response.result === 'success') {
          this.verified = true
          Vue.set(this.auth, 'verified', true)
        }
      } catch (error) {
        console.error(error)
      }
    },

    async resendVerificationEmail() {
      try {
        this.resending = true

        await callApi('/verify/resend', this.auth.token)

        this.verificationEmailSentAgain = true
      } catch (error) {
        console.log(error)
      } finally {
        this.resending = false
      }
    }
  }
}
</script>
