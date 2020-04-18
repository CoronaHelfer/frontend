<template>
  <q-card class="btn-card">
    <img :src="`statics/images/${this.content}.png`" />
    <q-list>
      <q-item clickable>
        <q-item-section>
          <q-item-label class="btn-card-label" header>{{
            getLabel
          }}</q-item-label>
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
    box-shadow: 0px 10px 6px #00000033
    border-radius: 10px

.btn-card-label
    color: $secondary
    font-weight: bold
    font-size: 1.25rem
</style>
