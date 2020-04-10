<template>
  <q-page>
    <header>
      <h4>{{ $t('supportTogether') }}</h4>
      <div class="row justify-center">
        <router-link class="q-mt-xs action-btn" to="/get-help">
          <q-btn>{{ $t('needHelp') }}</q-btn>
        </router-link>
        <router-link class="q-mt-xs action-btn" to="/help">
          <q-btn>{{ $t('wantHelp') }}</q-btn>
        </router-link>
      </div>
    </header>

    <body>
      <article>
        <h5>Portal für Nachbarschaftshilfe in deiner Region</h5>
        <p>
          <i>“Aus der Region - für die Region”</i> <br />
          Ganz nach diesem Motto möchten wir Coronavirus-Nachbarschaftshilfe
          erleichtern und vermitteln. <br /><br />
          Worum geht es? <br />Die aktuelle Situation stellt die Gesellschaft
          vor neue Herausforderungen. Das neuartige Coronavirus hat unser
          Zusammenleben in den vergangenen Wochen zunehmend eingeschränkt. Wir
          haben das Projekt CoronaHelfer ins Leben gerufen, um gemeinsam die
          Ausbreitung des Virus zu verlangsamen und einander dort zu
          unterstützen, wo es möglich ist.
        </p>
        <h5>Ziel und Vision der Initiative CoronaHelfer</h5>
        <ul>
          <li>CoronaHelfer schützt gefährdete Personen</li>
          <li>
            CoronaHelfer entlastet Menschen in systemrelevanten Berufen
            (Gesundheits-, Dienstleistungssystem etc.)
          </li>
          <li>CoronaHelfer unterstütz generell Hilfesuchende</li>
          <li>Coronavirus-Nachbarschaftshilfe für alle!</li>
        </ul>
        <h5>Leitsätze für Coronavirus-Nachbarschaftshilfe</h5>
        <ul>
          <li><b>C</b>ool bleiben</li>
          <li><b>O</b>rdentlich Hände waschen</li>
          <li><b>R</b>ücksichtsvoll bleiben</li>
          <li><b>O</b>hne Hamsterkäufe</li>
          <li><b>N</b>achbarschaftshilfe</li>
          <li><b>A</b>bstand halten</li>
        </ul>
        <h5>Unser Hintergrund</h5>
        <p>
          Wie ist unsere Idee entstanden? Über soziale Netzwerke sind wir darauf
          aufmerksam geworden, wie unfassbar viele von euch in ihrer Umgebung
          Hilfe angesichts der aktuellen Situation anbieten möchten. Bei anderen
          Vermittlungsportalen fiel uns die große Anzahl an hilfsbereiten
          Menschen im Gegensatz zu nur wenigen Anfragen auf.<br /><br />
          Wir haben erkannt, dass die Vermittlung von Fremden an Fremde eine
          große Herausforderung darstellt und machten uns die Sicherheit unserer
          Nutzer zur Aufgabe. Auch eine verlässliche und schnelle Vermittlung
          sowie die Einbindung bereits bestehender Offline-Arbeit vor Ort sind
          uns bei der Coronavirus-Nachbarschaftshilfe wichtig.<br /><br />
          Dank des Hackathons #WirVsVirus der Bundesregierung haben wir ein
          tolles Team für unsere Idee gewinnen können. Seitdem arbeiten wir
          gemeinsam auf Hochtouren an der Umsetzung und dem Ausbau unserer
          Vermittlungsplattform
        </p>
      </article>
    </body>
  </q-page>
</template>

<style lang="sass" scoped>
header
  text-align: center
  background: url('../statics/images/background.jpg') no-repeat
  background-size: cover
  padding: 50px
  color: white

  a
    text-decoration: none

  h4
    text-transform: uppercase
    margin: 0 0 30px 0

  .q-btn
    background: white
    border: 0
    border-radius: 19px
    color: $secondary
    cursor: pointer
    font-size: 20px
    font-weight: 400
    padding: 0 50px
    text-transform: uppercase

    &:focus
      outline: none

    &.primary
      background: $secondary
      color: white

    &.small
      height: 30px
      line-height: 30px
      padding: 0 30px
      font-size: 15px
      font-weight: 600
      margin-top: 15px

  .action-btn
    margin-right: 1%

body
  &:before
    background-color: white
    border-radius: 100%
    content: ''
    height: 50px
    position: absolute
    top: -25px
    width: 100%

  background-color: white
  // margin-top: 60px
  // padding: 20px 0 20px
  position: relative
  padding-bottom: 20px

  article
    padding-top: 30px
    margin: 20px auto 0
    max-width: 800px

    h5
      color: $secondary
      text-transform: uppercase
      font-weight: 600
      margin: 20px 0
</style>

<script>
export default {
  mounted() {
    if (this.$q.localStorage.getItem('server') === undefined) {
      // TODO: Set default values in a way that user does not have to access the landing page first
      const config = require('../assets/config.json')
      this.$q.localStorage.set('server', config.url)
    }
  }
}
</script>
