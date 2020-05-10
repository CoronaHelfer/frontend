<template>
  <q-card class="accent">
    <q-item>
      <q-item-section>
        <q-item-label>
          <h2>{{ offer.firstName }} {{ offer.lastName }}</h2>
        </q-item-label>
        <q-item-label v-if="offer.contactEmail">
          {{ $t('mail') }}:
          <a :href="`mailto:${offer.contactEmail}`">{{ offer.contactEmail }}</a>
        </q-item-label>
        <q-item-label v-if="offer.contactPhone">
          {{ $t('phone') }}:
          <a :href="`tel:${offer.contactPhone}`">{{ offer.contactPhone }}</a>
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item>
      <q-item-section>
        {{ offer.offer_text }}
      </q-item-section>
    </q-item>
  </q-card>
</template>

<style lang="sass" scoped>
.q-card
  border-radius: 10px
  padding: 5px
  margin: 5% auto
  background-color: rgb(254, 246, 239)
  width: 50%
</style>

<script>
export default {
  props: {
    offer: Object
  }
}
</script>
