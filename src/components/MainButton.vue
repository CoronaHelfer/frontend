<template>
  <q-card class="btn-card">
    <img class="image" :src="`statics/images/${this.content}.jpg`" />
    <q-list>
      <q-item clickable>
        <q-item-section>
          <q-item-label class="btn-card-label" header>
            {{ getLabel }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
export default {
  props: ['content'],
  computed: {
    getLabel: function() {
      return this.content === 'want-help'
        ? this.$t('wantHelp')
        : this.$t('needHelp')
    }
  }
}
</script>

<style lang="sass" scoped>
.btn-card
  transition: 300ms ease-in-out
  box-shadow: 0px 10px 6px rgba(0,0,0,0.1)
  border-radius: 10px

.btn-card-label
  color: $secondary
  font-weight: bold
  font-size: 1.00rem

.image
  object-fit: cover
  @media screen and (max-width: 1000px)
    max-height: 20vh
</style>
