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
          v-for="category in availableCats"
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
        class="q-pa-md q-gutter-md"
      >
        <div class="media-card row justify-around items-center">
          <div
            v-if="idx % 2 === 0 || $q.screen.lt.md"
            class="col-xs-12 col-md-5"
          >
            <q-img width="100%" :src="card.img">
              <div class="text-subtitle2 absolute-top-left text-center">
                <span v-if="card.caption.img === ''">{{
                  card.caption.name
                }}</span>
                <img v-else width="50" :src="card.caption.img" />
              </div>
            </q-img>
          </div>

          <div class="card-text col-xs-12 col-md-5">
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
                class="rounded q-mr-md col-xs-12 col-md-5"
                size="md"
              >
                <span>{{ $t('readMore') }}</span>
              </q-btn>
            </div>
          </div>

          <div
            v-if="$q.screen.gt.xs && idx % 2 === 1"
            class="col-xs-12 col-md-5"
          >
            <q-img :src="card.img">
              <div class="text-subtitle2 absolute-top-left text-center">
                <span v-if="card.caption.img === ''">{{
                  card.caption.name
                }}</span>
                <img v-else width="50" :src="card.caption.img" />
              </div>
            </q-img>
          </div>
        </div>
        <q-separator class="q-my-lg" />
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
          desc:
            'Aliquip voluptate occaecat in dolor aliqua non exercitation sunt eiusmod officia minim anim. Officia amet irure deserunt magna nulla. Officia sit in qui laboris eiusmod mollit incididunt cillum aliqua sint mollit pariatur sunt officia. Culpa et eu consequat sunt quis tempor ea aute dolore nisi pariatur cupidatat. Culpa officia culpa labore anim proident consequat deserunt elit laboris. Nulla est ex elit sit aliqua nisi nulla dolor officia cillum laborum ullamco. Dolore eu esse sint ea. Id amet enim amet Lorem excepteur nulla est. Minim excepteur nulla aute irure sunt ut eiusmod. Anim fugiat reprehenderit irure aliqua ex aliquip. Nostrud ullamco laborum ex velit proident. In esse officia laborum labore eu Lorem.',
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
  mounted() {
    this.loadCategories()
  },
  methods: {
    dateFormat: (val) => date.formatDate(val, 'DD.MM.YYYY'),
    loadCategories: function() {
      this.categorySelection = this.categories.reduce(
        (accumulator, current) => {
          accumulator[current.id] = false
          return accumulator
        },
        {}
      )
    }
  },
  computed: {
    availableCats: function() {
      return this.categories.filter((cat) => cat)
    }
  }
}
</script>
<style lang="sass" scoped>
.title
  background: url('../statics/images/Banner-Media.jpg') no-repeat

.card-date-cat
  font-size: 0.8rem
  font-weight: bold

article
  margin-top: 5rem
</style>
