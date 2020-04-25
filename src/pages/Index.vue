<template>
  <q-page>
    <div class="tertiary-bg">
      <div class="wrapper">
        <h1 class="uppercase">{{ $t('supportTogether') }}</h1>
        <div class="row justify-between">
          <router-link
            class="col-xs-12 col-md-4 q-mt-xs uppercase"
            to="/get-help"
          >
            <MainButton content="want-help" />
          </router-link>
          <router-link class="col-xs-12 col-md-4 q-mt-xs uppercase" to="/help">
            <MainButton content="need-help" />
          </router-link>
        </div>
      </div>
    </div>
    <article class="wrapper">
      <div class="fit row wrap justify-evenly items-start content-start q-mb-xl">
        <img width="30%" src="~assets/Logo-2.svg" />
      </div>
      <h1 class="uppercase">{{ $t('indexHeading') }}</h1>
      <i>{{ $t('indexSubHeading') }}</i>

      <h3>{{ $t('indexSubHeadingTwo') }}</h3>
      <p>
        {{ $t('indexInfoText') }}
      </p>

      <div class="q-my-xl">
        <h3>{{ $t('searchForm.title') }}</h3>
        <div class="row wrap">
          <div class="col-10 q-px-xs">
            <q-input
              filled
              v-model="zipcode"
              :label="$t('searchForm.zipcode')"
            >
              <template v-slot:append>
                <q-icon class="icon" name="room" />
              </template>
            </q-input>
          </div>
          <div class="col-2 q-px-xs">
            <q-btn
              @click="goToHelp()"
              :label="$t('searchForm.search')"
              color="secondary"
              size="lg"
            />
          </div>
        </div>
      </div>
    </article>
    <div class="tertiary-bg">
      <div class="wrapper">
        <h1 class="uppercase">{{ $t('goalsHeading') }}</h1>
        <div class="fit row wrap justify-between items-center content-center">
          <div class="vision-box">
            <div class="content-box">
              <img src="statics/icons/elderly-people-294088.svg" />
              <p class="q-mt-auto">
                {{ $t('saveElder') }}
              </p>
            </div>
          </div>
          <div class="vision-box">
            <div class="content-box">
              <img src="statics/icons/entlastet Menschen.svg" />
              <p class="q-mt-auto">
                {{ $t('relievePeople') }}
              </p>
            </div>
          </div>
        </div>
        <div class="fit row wrap justify-between items-center content-center">
          <div class="vision-box">
            <div class="content-box column">
              <img src="statics/icons/children-1296800.svg" />
              <p class="q-mt-auto">
                {{ $t('supportPeople') }}
              </p>
            </div>
          </div>
          <div class="vision-box">
            <div class="content-box column">
              <img src="statics/icons/volunteer.svg" />
              <p class="q-mt-auto">
                {{ $t('communitySupport') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <article class="wrapper">
      <h1 class="uppercase">{{ $t('guidingHeading') }}</h1>

      <div class="column">
        <div
          v-for="item in items"
          :key="item.img"
          class="principles row q-pa-lg q-mb-lg justify-between items-center"
        >
          <h2 class="principle-sentences">
            {{ $t(item.principle) }}
          </h2>
          <img width="40" :src="`statics/icons/${item.img}.svg`" />
        </div>
      </div>

      <q-separator inset />

      <h1 class="uppercase">{{ $t('historyHeading') }}</h1>
      <p>
        {{ $t('historyT1') }}<br /><br />
        {{ $t('historyT2') }}<br /><br />
        {{ $t('historyT3') }}
      </p>
    </article>
  </q-page>
</template>

<style lang="sass" scoped>
.tertiary-bg
  padding: 5% 0
  text-align: center
  background-color: $tertiary

.vision-box
  width: 40%
  height: 300px
  box-shadow: 0px 10px 6px #00000029
  border-radius: 10px
  padding: 5% 0
  margin-bottom: 2%
  background-color: $background
  .content-box
    margin: 0 auto
    width: 75%

.icon
  color: $secondary
  font-size: 2.5rem

.principles
  background-color: $tertiary
  border-radius: 10px
  .principle-sentences::first-letter
    font-weight: bold
    color: $secondary

.q-separator
  width: 30%
  margin: 3% auto 0 auto
  border: 2px solid $tertiary;
  background-color: $tertiary

article
  padding: 5% 0
  margin: 20px auto 0

h1
  text-align: center
</style>

<script>
import MainButton from 'src/components/MainButton'

export default {
  components: {
    MainButton
  },

  data: () => {
    return {
      zipcode: undefined,
      items: [
        {
          img: 'cool',
          principle: 'stayCool'
        },
        {
          img: 'Out line',
          principle: 'washHands'
        },
        {
          img: 'buyer',
          principle: 'behave'
        },
        {
          img: 'hamster',
          principle: 'noHamster'
        },
        {
          img: 'help',
          principle: 'supportNeighbor'
        },
        {
          img: 'distance',
          principle: 'socialDistance'
        }
      ]
    }
  },

  methods: {
    goToHelp() {
      this.$router.push({ path: 'help', query: { zipcode: this.zipcode } })
    }
  }
}
</script>
