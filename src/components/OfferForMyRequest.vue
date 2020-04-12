<template>
  <q-card class="bg-green-1">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="offer.picture">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{offer.firstName}}</q-item-label>
        <q-item-label caption>{{offer.lastName}}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator/>
    {{offer.offer_text}}
  </q-card>
</template>

<style lang="sass" scoped>
.q-card
  border-radius: 10px
  padding: 5px
  margin: 20px 40px
  background-color: rgb(254, 246, 239)
</style>

<script>
export default {
  props: {
    offer: Object
  }
}
</script>
