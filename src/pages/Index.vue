<template>
  <q-page>
    <div class="tertiary-bg">
      <div :class="$q.screen.gt.xs ? 'wrapper' : 'q-mx-lg'">
        <h1 class="uppercase">{{ $t('supportTogether') }}</h1>
        <div class="row justify-between">
          <router-link
            class="col-xs-12 col-md-5 q-mt-xs q-mb-md uppercase my-card"
            to="/help"
          >
            <MainButton content="want-help" />
          </router-link>
          <router-link
            class="col-xs-12 col-md-5 q-mt-xs q-mb-md uppercase my-card"
            to="/get-help"
          >
            <MainButton content="need-help" />
          </router-link>
        </div>
      </div>
      <div class="row justify-center items-center q-py-lg">
        <div class="mouse" v-on:click="scrollDown()">
          <div class="scroll"></div>
        </div>
      </div>
    </div>
    <div :class="$q.screen.gt.xs ? 'slanted-line' : ''">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#FFF3E9"
          fill-opacity="1"
          d="M0,192L1440,128L1440,0L0,0Z"
        ></path>
      </svg>
    </div>
    <article :class="$q.screen.gt.xs ? 'wrapper' : 'q-mx-lg'">
      <div
        class="fit row wrap justify-evenly items-start content-start q-mb-xl"
      >
        <q-img
          :width="$q.screen.gt.xs ? '30%' : '100%'"
          src="~assets/Logo-2.svg"
        />
      </div>
      <div class="title-aboutus">
        <h1 class="uppercase">{{ $t('indexHeading') }}</h1>
        <i>{{ $t('indexSubHeading') }}</i>
      </div>

      <h3>{{ $t('indexSubHeadingTwo') }}</h3>
      <p>
        {{ $t('indexInfoText') }}
      </p>

      <div id="search-section" class="q-my-xl">
        <h3>{{ $t('searchForm.title') }}</h3>
        <div class="row wrap">
          <div class="col-md-10 col-xs-12 q-px-xs q-my-xs">
            <q-input filled v-model="address" :label="$t('searchForm.address')">
              <template v-slot:append>
                <q-icon class="icon" name="room" />
              </template>
            </q-input>
          </div>
          <div class="col-md-2 col-xs-12 q-px-xs q-my-xs">
            <q-btn
              class="search-btn"
              @click="goToHelp()"
              :label="$t('searchForm.search')"
              color="secondary"
              size="lg"
            />
          </div>
        </div>
      </div>
    </article>
    <div :class="$q.screen.gt.xs ? 'slanted-line' : 'slanted-line-drag-bottom'">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#FFF3E9"
          fill-opacity="1"
          d="M0,96L1440,128L1440,320L0,320Z"
        ></path>
      </svg>
    </div>
    <div class="tertiary-bg">
      <div :class="$q.screen.gt.xs ? 'wrapper' : 'q-mx-lg'">
        <h1 class="uppercase">{{ $t('goalsHeading') }}</h1>
        <div class="fit row wrap justify-center">
          <div class="vision-box col-xs-12 col-md-4 q-ma-md">
            <div class="content-box">
              <img src="statics/icons/elderly-people-294088.svg" />
              <p class="q-mt-auto">
                {{ $t('saveElder') }}
              </p>
            </div>
          </div>
          <div class="vision-box col-xs-12 col-md-4 q-ma-md">
            <div class="content-box">
              <img src="statics/icons/entlastet Menschen.svg" />
              <p class="q-mt-auto">
                {{ $t('relievePeople') }}
              </p>
            </div>
          </div>
        </div>
        <div class="fit row wrap justify-center">
          <div class="vision-box col-xs-12 col-md-4 q-ma-md">
            <div class="content-box column">
              <img src="statics/icons/children-1296800.svg" />
              <p class="q-mt-auto">
                {{ $t('supportPeople') }}
              </p>
            </div>
          </div>
          <div class="vision-box col-xs-12 col-md-4 q-ma-md">
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
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#FFF3E9"
          fill-opacity="1"
          d="M0,192L1440,128L1440,0L0,0Z"
        ></path>
      </svg>
    </div>
    <article :class="$q.screen.gt.xs ? 'wrapper' : 'q-mx-lg'">
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
          <img
            v-if="$q.screen.gt.xs"
            width="40"
            :src="`statics/icons/${item.img}.svg`"
          />
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

<style lang="scss">
.my-card {
  transition: 300ms ease-in-out;
  &:hover {
    transform: scale(1.02) translate(0, -5px);
    transition: 300ms ease-in-out;
    .btn-card {
      box-shadow: 0px 20px 12px rgba(0, 0, 0, 0.1);
    }
  }
}
.mouse {
  width: 35px;
  height: 50px;
  border-radius: 25px;
  border: 2px solid $primary;
  opacity: 0.3;
  .scroll {
    width: 2px;
    height: 10px;
    margin: 0 auto;
    margin-top: 5px;
    border-radius: 5px;
    background-color: $primary;
    animation-name: scroll;
    transition: 800ms ease-in-out;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
}
@keyframes scroll {
  from {
    margin-top: 5px;
    opacity: 1;
  }
  to {
    margin-top: 15px;
    opacity: 0;
  }
}
.title-aboutus {
  display: table;
  margin: 6% auto;
  text-align: center;
  .uppercase {
    margin-bottom: 0px;
    line-height: inherit;
  }
}
</style>

<style lang="sass" scoped>
.tertiary-bg
  padding-top: 1%
  text-align: center
  background-color: $tertiary

.vision-box
  box-shadow: 0px 10px 6px rgba(0,0,0,0.1)
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
  border: 2px solid $tertiary
  background-color: $tertiary

h1
  text-align: center

.slanted-line
  margin-top: -75px
  margin-bottom: -150px

.slanted-line-drag-bottom
  margin-bottom: -10px

.search-btn
  width: 100%
</style>

<script>
import MainButton from 'src/components/MainButton'
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  components: {
    MainButton
  },

  data: () => {
    return {
      address: undefined,
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
      this.$router.push({ path: 'help', query: { address: this.address } })
    },

    scrollDown() {
      const ele = document.getElementById('search-section') // You need to get your element here
      const target = getScrollTarget(ele)
      const offset = ele.offsetTop - ele.scrollHeight
      const duration = 1000
      setScrollPosition(target, offset, duration)
    }
  }
}
</script>
