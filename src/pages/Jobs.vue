<template>
  <q-page>
    <div class="title"/>
    <article>
      <h3>Reinschauen lohnt sich:</h3>
      <h1>Wir suchen Verstärkung</h1>

      <p>Der ideale Kandidat wird für den Entwurf, die Entwicklung, das Testen und das Debugging von reaktionsschnellen
        Web- und Mobilanwendungen für das Unternehmen verantwortlich sein. Unter Verwendung von JavaScript und
        Web-Framework-Anwendungen, wie Vue.Js und Quasar sollte dieser Kandidat in der Lage sein, Benutzer- und
        Geschäftsanforderungen in funktionales Frontend-Design umzusetzen.</p>

      <h3 class="uppercase">Verantwortlichkeiten</h3>
      <p>Entwerfen, Entwickeln und Testen von UI für mobile und Web-Anwendungen</p>
      <p>Erstellen von wiederverwendbarem Code und Bibliotheken für die zukünftige Verwendung</p>
      <p>Genaue Übersetzung von Benutzer- und Geschäftsanforderungen in funktionalen Frontend-Code</p>

      <h3 class="uppercase">Qualifikationen</h3>
      <p>Äquivalent in Informatik</p>
      <p>optimalerweise 2 Jahre Erfahrung in der Frontend-Entwicklung</p>
      <p>Motivation zur eigenstädigen Weiterentwicklung</p>
      <p>Vertrautheit mit Scrum/Agile Entwicklungsmethoden</p>
      <p>Erfahrung in der Erstellung</p>
      <p>objektorientierter Webanwendungen in JavaScript, Vue.Js Framework und dem Quasar Framework</p>

      <h3 class="uppercase">Interessiert?</h3>
      {{$t('jobsContact2')}}: <a href="mailto:info@coronahelfer.eu">info@coronahelfer.eu</a>
    </article>
  </q-page>
</template>

<style lang="sass" scoped>
.title
  margin-top: 75px
  text-align: center
  background: url('../statics/images/Banner-Jobs.png') no-repeat
  background-size: 100%
  color: white
  height: 450px

article
  padding: 30px 0 20px 0
  margin: -450px auto 0
  max-width: 800px
  min-height: calc(100vh - 340px)

  h3:first-of-type
    margin-top: 220px
    color: white
    text-align: left

  h1
    margin-top: -20px
    color: white
    font-weight: bold
    font-size: 70px
    line-height: 96px
    text-align: left

  p:first-of-type
    margin-top: 75px

  h3
    margin-top: 100px

  a
    color: $secondary
</style>

<script>
export default {}
</script>
