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
      <!-- <div class="press-contacts row q-mb-md">
        {{ $t('pressContacts') }}: David Louis, Celal Simsek &nbsp; <a href="mailto:presse@coronahelfer.eu">presse@coronahelfer.eu</a>
      </div> -->
      <div class="row col-xs-12 col-md-6 q-pt-md">
        <q-chip
          v-for="category in categories"
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
                <span v-if="post.caption.img === ''">
                  {{ post.caption.name }}
                </span>
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
                target="__blank"
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
                target="__blank"
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
        { id: 1, name: 'general', count: 3 },
        { id: 2, name: 'corporate', count: 0 },
        { id: 3, name: 'press', count: 0 },
        { id: 4, name: 'technology', count: 0 },
        { id: 5, name: 'socialMedia', count: 0 }
      ],
      filteredPosts: this.posts,
      posts: [
        {
          id: 3,
          date: '2020-05-06',
          category: 1,
          title: 'Soziale Wärme im Internet verknüpfen',
          desc: '„CoronaHelfer“ soll die Vernetzungsplattform für nachbarschaftliche Fürsorge werden',
          img: 'statics/images/website-mockup.jpg',
          url: 'https://www.wnoz.de/Soziale-Waerme-im-Internet-verknuepfen-a37ad3de-c7d8-47e2-9a10-f4a991c767e2-ds',
          lang: 'German',
          caption: {
            name: 'WNOZ',
            img: ''
          }
        },
        {
          id: 2,
          date: '2020-05-05',
          category: 1,
          title: 'Eine App für Mitmenschlichkeit - auch nach Corona',
          desc: 'Die Plattform wurde in Luxemburg und Österreich bereits ausgezeichnet. Was ist die Idee dahinter? Gespräch mit der Gründerin Regina Roos.',
          img: 'statics/images/mockup.jpg',
          url: 'https://www.srf.ch/play/radio/rendez-vous/audio/eine-app-fuer-mitmenschlichkeit-auch-nach-corona?id=0c548517-50e8-4f5f-80f9-fae34f476cc7&fbclid=IwAR1De9qvJiYghbtFoI3gvXrYi206jP5tmliSYauHuCfkjcveuoB9YBkgdSg',
          lang: 'German',
          caption: {
            name: 'SRF',
            img: ''
          }
        },
        {
          id: 1,
          date: '2020-05-04',
          category: 1,
          title: 'Badener Team entwickelt Corona-App, die nach dem Vorbild von Uber funktioniert',
          desc: 'Wenn von Corona und Handy-Apps die Rede ist, geht es meist um das sogenannte Contact Tracing. Doch Smartphones bieten auch andere Möglichkeiten, um den Alltag während der Pandemie zu meistern.',
          img: 'statics/images/mockup.jpg',
          url: 'https://www.aargauerzeitung.ch/aargau/baden/badener-team-entwickelt-corona-app-die-nach-dem-vorbild-von-uber-funktioniert-137778177',
          lang: 'German',
          caption: {
            name: 'AZ',
            img: ''
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
  }
}
</script>

<style lang="sass" scoped>
.title
  background: url('../statics/images/Banner-Media.jpg') no-repeat
  background-size: cover
  background-color: $secondary

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

.press-contacts
  color: $secondary
  border-radius: 8px
  a
    font-weight: bold
    color: $secondary
</style>
