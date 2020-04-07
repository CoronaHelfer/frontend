<template>
  <q-dialog
    v-model="isDialogOpen"
    persistent>
    <q-card v-if="success" class="card">
        <h2>DANKE FÜR DEINE NACHRICHT</h2>
        <p>Du wirst bestimmt bald kontaktiert!</p>
        <q-btn
          rounded
          to="/"
          color="secondary"
          label="Anfragen zeigen"
          style="width: 100%"></q-btn>
      <!--TODO: redirect to /profile/requests once this page exists -->
    </q-card>

    <q-card
      v-else-if="!auth.authenticated"
      class="card">
      <q-card-section class="column items-center q-pb-none">
        <h2>DANKE, DASS DU HELFEN WILLST</h2>
        <p>Um zu antworten, musst du angemeldet sein.</p>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          rounded
          to="login"
          color="secondary"
          label="Zum Login"
          style="width: 100%"></q-btn>
      </q-card-actions>
    </q-card>

    <q-card
      v-else
      style="min-width: 350px"
      class="card">
      <q-card-section class="row items-center q-pb-none">
        <q-space/>
        <q-btn icon="close" flat round dense v-close-popup></q-btn>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense autofocus filled
          type="textarea"
          v-model="offer"
          label="Nachricht"
          @keyup.enter="selectedRequest = undefined"></q-input>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          flat
          color="secondary"
          icon="send"
          v-on:click="sendOffer"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="sass" scoped>
.card
  border-radius: 10px
  padding: 20px

  h2
    font-size: 1.5em
    margin: 10px 0
</style>

<script>
import { callApi } from '../../api/requests'

export default {
  props: {
    isDialogOpen: Boolean,
    requestId: String
  },

  data () {
    return {
      success: false,
      offer: ''
    }
  },

  computed: {
    auth: {
      get () {
        return Object.assign({}, this.$store.state.auth.data)
      },
      set (val) {
        this.$store.commit('auth/updateData', val)
      }
    }
  },

  methods: {
    async sendOffer () {
      try {
        if (this.offer === '') throw new Error(this.$t('emptyField'))

        const res = await callApi(
          this.$q.localStorage.getItem('server') + 'request/helper',
          this.auth.token,
          {
            offerText: this.offer,
            requestId: this.requestId
          },
          'POST'
        )

        if (res.error) throw new Error(this.$t('somethingWentWrong'))

        this.success = true
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
