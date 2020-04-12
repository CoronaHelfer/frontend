<template>
  <q-page>
    <header>
      <h1>Angebote XX</h1>
    </header>

    <body>
      <article>
        <p v-if="offers.length === 0">{{$t('noRequestsCreated')}} XX</p>
        <OfferForMyRequest
          v-else
          v-for="(offer, index) in offers"
          v-bind:key="index"
          :offer="offer"/>
      </article>
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
</style>

<script>
import OfferForMyRequest from '../components/OfferForMyRequest'

export default {
  components: {
    OfferForMyRequest
  },

  data() {
    return {
      offers: this.$q.localStorage.getItem('offers')
    }
  }
}
</script>
