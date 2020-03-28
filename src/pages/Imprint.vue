<template>
  <q-page>
    <header>
      <h4>Impressum</h4>
    </header>
    <body>
    <article>
      <h5>Diensteanbieter</h5>
      <p>
        David Louis
        <br/>
        Mozartstraße 5<br/>
        69214 Eppelheim
        <br/>
        Deutschland
      </p>
      <h5>Kontaktmöglichkeiten</h5>
      <p>
        <strong>E-Mail-Adresse:</strong> info@coronahelfer.eu
      </p>
      <h5>Social Media und andere Onlinepräsenzen</h5>
      <p>
        Dieses Impressum gilt auch für die folgenden Social-Media-Präsenzen
        und Onlineprofile:
      </p>
      <ul>
        <li>
          <a href="https://www.facebook.com/coronahelfer.eu/">
            https://www.facebook.com/coronahelfer.eu/
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/coronahelfer.eu/">
            https://www.instagram.com/coronahelfer.eu/
          </a>
        </li>
        <li>
          <a href="https://twitter.com/CoronahelferE">
            https://twitter.com/CoronahelferE
          </a>
        </li>
      </ul>
      <h5>Haftungs- und Urheberrechtshinweise</h5>
      <p>
        <strong>Links auf fremde Webseiten:</strong> Inhalte fremder
        Webseiten, auf die wir direkt oder indirekt verweisen, liegen
        außerhalb unseres Verantwortungsbereiches und machen wir uns nicht
        zu Eigen. Für alle Inhalte und insbesondere für Schäden, die aus der
        Nutzung der in den verlinkten Webseiten aufrufbaren Informationen
        entstehen, haftet allein der Anbieter der verlinkten Webseiten.
      </p>
      <p style="margin-bottom: 0">
        <a href="https://datenschutz-generator.de/?l=de">
          Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas
          Schwenke
        </a>
      </p>
    </article>
    </body>
  </q-page>
</template>

<style lang="sass" scoped>
  header
    text-align: center
    padding: 50px
    color: white

    height: 4px
    h4
      text-transform: uppercase
      margin: 0 0 30px 0

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
    position: relative
    padding-bottom: 100px  // hack for large screens

    article
      padding-top: 30px
      margin: 20px auto 0
      max-width: 800px

      h5
        color: $secondary
        text-transform: uppercase
        font-weight: 600
        margin: 20px 0

      strong
        color: $secondary
</style>

<script>
export default {
}
</script>
