<template>
  <q-page>
    <div class="tertiary-bg">
      <div class="wrapper">
        <h1 class="uppercase">{{ $t('supportTogether') }}</h1>
        <div class="row justify-between">
          <router-link
            class="col-xs-12 col-md-5 q-mt-xs uppercase my-card"
            to="/help"
          >
            <MainButton content="want-help" />
          </router-link>
          <router-link class="col-xs-12 col-md-5 q-mt-xs uppercase my-card" to="/get-help">
            <MainButton content="need-help" />
          </router-link>
        </div>
      </div>
      <div class="mouse">
        <div class="scroll"></div>
      </div>
    </div>
    <article class="wrapper">
      <div class="fit row wrap justify-evenly items-start content-start">
        <img width="30%" src="~assets/Logo-2.svg" />
      </div>
      <div class="title-aboutus">
        <h1 class="uppercase">Portal für Nachbarschaftshilfe in deiner Region</h1>
        <i>“Aus der Region - für die Region”</i>
      </div>
      <h3>Worum geht es?</h3>
      <p>
        Die aktuelle Situation stellt die Gesellschaft vor neue
        Herausforderungen. Das neuartige Coronavirus hat unser Zusammenleben in
        den vergangenen Wochen zunehmend eingeschränkt. Wir haben das Projekt
        CoronaHelfer ins Leben gerufen, um gemeinsam die Ausbreitung des Virus
        zu verlangsamen und einander dort zu unterstützen, wo es möglich ist.
      </p>
      <CustomSearch/>
    </article>
    <div class="tertiary-bg">
      <div class="wrapper">
        <h1 class="uppercase">Ziel und Vision der Initiative CoronaHelfer</h1>
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
      <h1 class="uppercase">Leitsätze für Coronavirus-Nachbarschaftshilfe</h1>

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

      <h1 class="uppercase">Unser Hintergrund</h1>
      <p>
        Wie ist unsere Idee entstanden? Über soziale Netzwerke sind wir darauf
        aufmerksam geworden, wie unfassbar viele von euch in ihrer Umgebung
        Hilfe angesichts der aktuellen Situation anbieten möchten. Bei anderen
        Vermittlungsportalen fiel uns die große Anzahl an hilfsbereiten Menschen
        im Gegensatz zu nur wenigen Anfragen auf.<br /><br />
        Wir haben erkannt, dass die Vermittlung von Fremden an Fremde eine große
        Herausforderung darstellt und machten uns die Sicherheit unserer Nutzer
        zur Aufgabe. Auch eine verlässliche und schnelle Vermittlung sowie die
        Einbindung bereits bestehender Offline-Arbeit vor Ort sind uns bei der
        Coronavirus-Nachbarschaftshilfe wichtig.<br /><br />
        Dank des Hackathons #WirVsVirus der Bundesregierung haben wir ein tolles
        Team für unsere Idee gewinnen können. Seitdem arbeiten wir gemeinsam auf
        Hochtouren an der Umsetzung und dem Ausbau unserer Vermittlungsplattform
      </p>
    </article>
  </q-page>
</template>

<style lang="scss">
.my-card{
  transition: 300ms ease-in-out;
  &:hover{
    transform: scale(1.02) translate(0, -5px);
    transition: 300ms ease-in-out;
    .btn-card{
      box-shadow: 0px 20px 12px rgba(0,0,0, 0.1);
    }
  }
}
.mouse {
  width: 35px;
  height: 50px;
  border-radius: 25px;
  border: 2px solid $primary;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%);
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
  .uppercase {
    margin-bottom: 0px;
    line-height: inherit;
  }
}
</style>

<style lang="sass" scoped>
.tertiary-bg
  padding-top: 1%
  padding-bottom: 7%
  text-align: center
  background-color: $tertiary
  position: relative
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
  border: 2px solid $tertiary
  background-color: $tertiary

article
  padding: 5% 0
  margin: 20px auto 0

h1
  text-align: center
</style>

<script>
import MainButton from 'src/components/MainButton'
import CustomSearch from 'src/components/CustomSearch'

export default {
  components: {
    MainButton,
    CustomSearch
  },
  data: () => {
    return {
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
  mounted() {
    if (this.$q.localStorage.getItem('server') === null) {
      // TODO: Set default values in a way that user does not have to access the landing page first
      const config = require('../assets/config.json')
      if (config['use-external-backend']) {
        this.$q.localStorage.set('server', config.url)
      } else {
        this.$q.localStorage.set('server', '')
      }
    }
  }
}
</script>
