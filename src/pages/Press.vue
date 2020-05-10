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
      <div class="row col-xs-12 col-md-6 q-pt-md">
        <q-chip
          v-for="category in filteredCategories"
          :key="category.id"
          :selected.sync="categorySelection[category.id]"
          color="secondary"
          text-color="white"
          size="lg"
        >
          {{ $t(category.name) }} &nbsp;&nbsp; <span class="category-count">{{ category.count }}</span>
        </q-chip>
      </div>
      <q-separator class="q-my-xl" />
      <div
        v-for="(post, index) in filteredPosts"
        :key="post.id"
      >
        <div
          class="media-card row items-center"
          v-if="index % 2 === 0 || $q.screen.lt.md"
        >
          <div class="col-xs-12 col-md-5">
            <q-img class="image" :src="post.img">
              <div class="text-subtitle2 absolute-top-left text-center">
                <span v-if="post.caption.img === ''">{{
                  post.caption.name
                }}</span>
                <img v-else width="50" :src="post.caption.img" />
              </div>
            </q-img>
          </div>
          <div
            class="col-xs-12 col-md-7"
            :class="{
              'q-pl-xl': $q.screen.gt.sm,
              'q-pt-lg': $q.screen.lt.md,
            }"
          >
            <div class="card-date-cat">
              {{ dateFormat(post.date) }} /
              {{ $t(getCategoryName(post.category)) }}
            </div>
            <h3>{{ post.title }}</h3>
            {{ post.desc }}
            <div class="q-mt-lg">
              <q-btn
                type="a"
                :href="post.url"
                class="rounded q-mr-md col-xs-12 col-md-5"
                size="md"
              >
                <span>{{ $t('readMore') }}</span>
              </q-btn>
            </div>
          </div>
        </div>
        <div
          class="media-card row items-center"
          v-if="$q.screen.gt.sm && index % 2 === 1"
        >
          <div class="card-text col-xs-12 col-md-7 q-pr-xl">
            <div class="card-date-cat">
              {{ dateFormat(post.date) }} /
              {{ $t(getCategoryName(post.category)) }}
            </div>
            <h3>{{ post.title }}</h3>
            {{ post.desc }}
            <div class="q-mt-lg">
              <q-btn
                type="a"
                :href="post.url"
                class="rounded q-mr-md col-xs-12 col-md-5"
                size="md"
              >
                <span>{{ $t('readMore') }}</span>
              </q-btn>
            </div>
          </div>
          <div class="col-xs-12 col-md-5">
            <q-img class="image" :src="post.img">
              <div class="text-subtitle2 absolute-top-left text-center">
                <span v-if="post.caption.img === ''">
                  {{ post.caption.name }}
                </span>
                <img v-else width="50" :src="post.caption.img" />
              </div>
            </q-img>
          </div>
        </div>
        <q-separator class="q-my-xl" />
      </div>
    </article>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { isEmpty } from 'ramda'

export default {
  name: 'Press',
  data() {
    return {
      categorySelection: {},
      categories: [
        { id: 1, name: 'general', count: 1 },
        { id: 2, name: 'corporate', count: 1 },
        { id: 3, name: 'press', count: 0 },
        { id: 4, name: 'technology', count: 1 },
        { id: 5, name: 'socialMedia', count: 0 }
      ],
      filteredPosts: this.posts,
      posts: [
        {
          id: 1,
          date: '2020-05-05',
          category: 1,
          title: this.$t('srfTitle'),
          desc: this.$t('srfDesc'),
          img: 'https://cdn.quasar.dev/img/parallax2.jpg',
          url: 'https://www.srf.ch/play/radio/rendez-vous/audio/eine-app-fuer-mitmenschlichkeit-auch-nach-corona?id=0c548517-50e8-4f5f-80f9-fae34f476cc7',
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
    },

    getCategoryName(categoryId) {
      const category = this.categories.find((category) => category.id === categoryId)

      return category.name
    }
  },
  watch: {
    categorySelection: {
      deep: true,
      handler: function(selection) {
        const selectedCategories = Object.entries(selection)
          .filter(([key, value]) => !!value)
          .map(([key, value]) => Number(key))

        this.filteredPosts = !isEmpty(selectedCategories)
          ? this.posts.filter(post => selectedCategories.includes(post.category))
          : this.posts
      }
    }
  },
  computed: {
    filteredCategories: function () {
      return this.categories.filter(category => category.count > 0)
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

.image
  border-radius: 8px

.category-count
  font-size: 1rem
  font-weight: bold
</style>
