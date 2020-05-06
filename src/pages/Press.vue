<template>
<q-page>
  <div class="title row items-end">
      <div :class="$q.screen.gt.xs ? 'wrapper column' : 'column q-px-md'">
          <div class="banner-sub col">{{ $t('pressSubtitle') }}</div>
          <div class="banner-title col">{{ $t('pressTitle') }}</div>
      </div>
  </div>

  <div class="q-pa-md row items-start q-gutter-md">
  <q-card v-for='card in cards' :key='card.id' class="media-card">
    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
      <div class="text-subtitle2 absolute-top text-center">
        {{card.title}}
      </div>
    </q-img>
    <q-card-section>
        {{card.desc}}
    </q-card-section>
  </q-card>
  </div>
  <section :class="$q.screen.gt.xs ? 'wrapper' : 'q-mx-lg'">
      <h1>{{ $t('contactTitle') }}</h1>
      <h3>{{ $t('contactName1') }}</h3>
      <p>{{ $t('contactTitle1') }}</p>
      <p>E-Mail: <a href='mailto:info@coronahelfer.eu'>info@coronahelfer.eu</a></p>
      <h3 style="padding-top: 2rem">{{ $t('contactName2') }}</h3>
      <p>{{ $t('contactTitle2') }}</p>
      <p>E-Mail: <a href='mailto:info@coronahelfer.eu'>press@coronahelfer.eu</a></p>
  </section>
</q-page>

</template>

<script>
export default {
  name: 'Press',
  data() {
    return {
      cards: [
        {
          id: 1,
          title: this.$t('srfTitle'),
          desc: this.$t('srfDesc'),
          url: 'https://www.srf.ch/play/radio/rendez-vous/audio/eine-app-fuer-mitmenschlichkeit-auch-nach-corona?id=0c548517-50e8-4f5f-80f9-fae34f476cc7',
          lang: 'German'
        },
        {
          id: 2,
          title: this.$t('mannheimerTitle'),
          desc: this.$t('mannheimerDesc'),
          url: '',
          lang: 'German'
        }
      ]
    }
  }
}
</script>
<style lang="sass" scoped>
.title
  background: url('../statics/images/Banner-Media.jpg') no-repeat
  background-size: cover
  background-color: $secondary
  height: 100%
  padding-top: 15%

  div
    .banner-title
      color: white
      font-weight: bold
      font-size: 3.4rem
      margin: 0 0 5% 0

    .banner-sub:first-of-type
      color: white
      font-size: 1.3rem
.media-card
    width: 100%
    max-width: 250px
article
    margin-top: 5rem
a
    color: #EF7D18
</style>
