<template>
  <q-page>
    <div class="title row items-end">
      <div :class="$q.screen.gt.xs ? 'wrapper column' : 'column q-px-md'">
        <div class="banner-sub col">{{ $t('pressSubtitle') }}</div>
        <div class="banner-title col">{{ $t('pressTitle') }}</div>
      </div>
    </div>
    <article :class="$q.screen.gt.xs ? 'wrapper' : 'q-mx-lg'">
      <div class="row">
        {{ $t('pressIntro') }}
      </div>
      <div class="row col-xs-12 col-md-6 q-pa-sm">
        <q-chip
          v-for="category in categories"
          :key="category.id"
          :selected.sync="categorySelection[category.id]"
          color="secondary"
          text-color="white"
          size="md"
        >
          {{ $t(category.name) }}
        </q-chip>
      </div>
      <q-separator class="q-my-lg" />
      <div
        v-for="(card, idx) in cards"
        :key="card.id"
        class="q-pa-md row items-start q-gutter-md"
      >
        <q-card class="media-card" flat>
          <q-card-section horizontal>
            <q-img class="col-5" v-if="idx % 2 === 0" :src="card.img">
              <div class="text-subtitle2 absolute-top-left text-center">
                <span v-if="card.caption.img === ''">{{
                  card.caption.name
                }}</span>
                <img v-else width="50" :src="card.caption.img" />
              </div>
            </q-img>

            <q-card-section class="card-text">
              <div class="card-date-cat">
                {{ dateFormat(card.date) }} /
                {{ $t(categories.find((cat) => cat.id == card.category).name) }}
              </div>
              <h3>{{ card.title }}</h3>
              {{ card.desc }}
              <div class="q-mt-lg">
                <q-btn
                  type="a"
                  :href="card.url"
                  class="rounded q-mr-md col-xs-12 col-md-6"
                  size="md"
                >
                  <span>{{ $t('readMore') }}</span>
                </q-btn>
              </div>
            </q-card-section>

            <q-img class="col-5" v-if="idx % 2 === 1" :src="card.img">
              <div class="text-subtitle2 absolute-top-left text-center">
                <span v-if="card.caption.img === ''">{{
                  card.caption.name
                }}</span>
                <img v-else width="50" :src="card.caption.img" />
              </div>
            </q-img>
          </q-card-section>
        </q-card>
      </div>
    </article>
  </q-page>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'Press',
  data() {
    return {
      categorySelection: {},
      categories: [
        { id: '1', name: 'general' },
        { id: '2', name: 'corporate' },
        { id: '3', name: 'press' },
        { id: '4', name: 'technology' },
        { id: '5', name: 'socialMedia' }
      ],
      cards: [
        {
          id: 1,
          date: '2020-05-05',
          category: 1,
          title: this.$t('srfTitle'),
          desc: this.$t('srfDesc'),
          img: 'https://cdn.quasar.dev/img/parallax2.jpg',
          url:
            'https://www.srf.ch/play/radio/rendez-vous/audio/eine-app-fuer-mitmenschlichkeit-auch-nach-corona?id=0c548517-50e8-4f5f-80f9-fae34f476cc7',
          lang: 'German',
          caption: {
            name: 'SRF',
            img: ''
          }
        },
        {
          id: 2,
          date: '2020-05-06',
          category: 2,
          title: this.$t('mannheimerTitle'),
          desc: this.$t('mannheimerDesc'),
          img: 'https://cdn.quasar.dev/img/parallax2.jpg',
          url: '',
          lang: 'German',
          caption: {
            name: 'SRF',
            img: ''
          }
        },
        {
          id: 3,
          date: '2020-05-07',
          category: 4,
          title: this.$t('mannheimerTitle'),
          desc: this.$t('mannheimerDesc'),
          img: 'https://cdn.quasar.dev/img/parallax2.jpg',
          url: '',
          lang: 'German',
          caption: {
            name: 'Coronahelfer.eu',
            img: 'statics/images/CoronaHelfer-Logo.svg'
          }
        }
      ]
    }
  },
  methods: {
    dateFormat: (val) => date.formatDate(val, 'DD.MM.YYYY')
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
.card-date-cat
  font-size: 0.8rem
  font-weight: bold
.card-text
  width: 50%
.media-card
  width: 100%

article
  margin-top: 5rem

// .read-more-btn
//   background-color: $secondary
//   padding: 5px
//   color: white
//   border-radius: 10px 10px
</style>
