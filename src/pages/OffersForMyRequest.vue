<template>
  <q-page v-if="request" class="wrapper">
    <h1 class="text-center q-mt-xl">{{ request.title }}</h1>

    <article>
      <p v-if="request.helper.length === 0">{{ $t('noOffers') }}</p>
      <OfferForMyRequest
        v-else
        v-for="(offer, index) in request.helper"
        v-bind:key="index"
        :offer="offer"
      />
      <q-btn @click="$router.push('help')" class="full-width">{{
        $t('goBack')
      }}</q-btn>
    </article>
  </q-page>
</template>

<style lang="sass" scoped>
h1
  font-size: 2rem
</style>

<script>
import OfferForMyRequest from '../components/OfferForMyRequest'

export default {
  components: {
    OfferForMyRequest
  },

  data() {
    return {
      request: undefined
    }
  },

  mounted() {
    this.request = this.$route.params.request
  }
}
</script>
