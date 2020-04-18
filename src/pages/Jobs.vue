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
  margin-top: 4.7rem
  text-align: center
  background: url('../statics/images/Banner-Jobs.png') no-repeat
  background-size: 100%
  color: white
  height: 28.1rem

article
  padding: 1.9rem 0 1.3rem 0
  margin: -25rem auto 0
  max-width: 50rem
  min-height: calc(100vh - 21.3rem)

  h3:first-of-type
    margin-top: 13.8rem
    color: white

  h1
    margin-top: -1.3rem
    color: white
    font-weight: bold
    font-size: 4.4rem
    line-height: 4.7rem

  p:first-of-type
    margin-top: 5rem

  h3
    margin-top: 6.3rem

  a
    color: $secondary
</style>

<script>
export default {}
</script>
