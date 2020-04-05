<template>
  <q-page>
    <header>
      <h1>Sicherheitsleitfaden</h1>
    </header>
    <body>
      <article>
        <h2>Unsere CoronaHelfer-Empfehlungen</h2>
        Bittet beachtet unsere Empfehlungen, damit Ihr bei der Coronavirus-Nachbarschaftshilfe sicher und gesund bleibt!

        <h2>Allgemeine und Sicherheitshinweise</h2>
        <ul>
          <li>Bitte <strong>bei der ersten Begegnung</strong>, zu deiner eigenen Sicherheit ermöglichen, dass eine weitere Person deines Haushalts anwesend ist.</li>
          <li><strong>Gebe bitte keine vertraulichen Daten an Dritte weiter</strong>, wie Bankdaten oder Passwörter!</li>
          <li>Bitte sorge dafür, dass du unter den angegebenen Kontaktdaten auch <strong>erreichbar</strong> bist - sowohl unter der angegebenen E-Mail-Adresse und Telefonnummer, als auch unter der Anschrift.</li>
          <li>Bitte sei <strong>zum verabredeten Zeitpunkt am abgesprochenen Treffpunkt</strong> - sollte dir das nicht möglich sein, informiere die andere Partei bitte zeitnah darüber.</li>
          <li><strong>Höflichkeit und Respekt</strong> gehören aktuell mehr denn je zur Tagesordnung. Auch wenn uns dieser neuartige Virus Angst macht, bleiben wir cool und sind freundlich zu unseren Mitmenschen. #spreadlove</li>
        </ul>

        <h2>Hygiene- und Gesundheitshinweise</h2>
        <ul>
          <li>Halte bei der Übergabe einen <strong>Mindestabstand von 1,5 Metern</strong> ein, um beide Parteien zu schützen!</li>
          <li><strong>Vermeide unnötige Berührungen</strong> und (Hand-)Kontakte mit Dritten.</li>
          <li>Bitte wasche dir generell häufiger die Hände gründlich <strong>mit Seife für mindestens 20 Sekunden</strong>, insbesondere nach Kontakten und auch vor und nach dem Verzehr von Speisen. Vermeide es hierbei auch, dir ins Gesicht zu fassen.</li>
          <li>Husten und Niesen, wenn es geht, in die <strong>Armbeuge</strong>. Wenn möglich, trage bitte zum Eigen- und Fremdschutz eine <strong>Atemmaske</strong>.</li>
          <li><strong>Reinige erhaltene Gegenstände</strong> sofort nach Erhalt gründlich (bestenfalls mit Desinfektionsmittel und Seife). Bei der Übergabe sind ggf. auch <strong>Einmal-Handschuhe</strong> empfehlenswert.</li>
        </ul>
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
  padding-bottom: 20px

  article
    padding-top: 30px
    margin: 20px auto 0
    max-width: 800px

    h2
      color: $secondary
      text-transform: uppercase
      font-weight: 600
      margin: 20px 0
</style>

<script>
export default {
}
</script>
