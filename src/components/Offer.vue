<template>
  <q-dialog v-model="isTheDialogOpen" persistent>
    <q-card v-if="success" class="card">
      <q-card-section class="row items-end q-pb-none">
        <q-space />
        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
          @click="reset"
        ></q-btn>
      </q-card-section>
      <h2>DANKE FÜR DEINE NACHRICHT</h2>
      <p>Du wirst bestimmt bald kontaktiert!</p>
    </q-card>

    <q-card v-else style="min-width: 350px" class="card">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup></q-btn>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          autofocus
          filled
          type="textarea"
          v-model="offer"
          label="Nachricht"
          @keyup.enter="selectedRequest = undefined"
        ></q-input>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat icon="send" v-on:click="sendOffer"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="sass" scoped>
.card
  border-radius: 10px
  padding: 20px
</style>

<script>
import apiService from '../services/api'
import { clone } from 'ramda'
import ga from '../analytics'

export default {
  props: {
    isDialogOpen: Boolean,
    requestId: String
  },

  data() {
    return {
      isTheDialogOpen: false,
      success: false,
      offer: ''
    }
  },

  watch: {
    isDialogOpen(value) {
      this.isTheDialogOpen = value
    },

    isTheDialogOpen(value) {
      if (!value) {
        this.$emit('dialogClosed')
      }
    }
  },

  computed: {
    auth() {
      return clone(this.$store.state.auth)
    }
  },

  methods: {
    async sendOffer() {
      try {
        if (this.offer === '') throw new Error(this.$t('emptyField'))

        await apiService.post(
          '/request/helper',
          {
            offerText: this.offer,
            requestId: this.requestId
          },
          this.auth.token
        )

        this.success = true

        ga.logEvent('Buttons', 'Click', 'Offer help on request', this.auth.id)
      } catch (error) {
        console.error(error)
      }
    },

    reset() {
      this.success = false
      this.offer = ''
    }
  }
}
</script>
