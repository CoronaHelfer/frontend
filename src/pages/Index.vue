<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <h1>Gemeinsam Helfen</h1>
      <div className="button-bar">
        <router-link to="/get-help">
          <q-btn style="marginRight: 30">Ich brauche Hilfe</q-btn>
        </router-link>
        <router-link to="/help">
          <q-btn>Ich möchte helfen</q-btn>
        </router-link>
      </div>
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center">
        <div className="StartPage">
          <article>
            <h2 color="secondary">Portal für Nachbarschaftshilfe in deiner Region</h2>
            <p>
              <i>“Aus der Region - für die Region”</i> <br/>
              Ganz nach diesem Motto möchten wir Coronavirus-Nachbarschaftshilfe erleichtern und vermitteln. <br/><br/>
              Worum geht es? <br/>Die aktuelle Situation stellt die Gesellschaft vor neue Herausforderungen. Das
              neuartige Coronavirus hat unser Zusammenleben in den vergangenen Wochen zunehmend eingeschränkt. Wir haben
              das Projekt CoronaHelfer ins Leben gerufen, um gemeinsam die Ausbreitung des Virus zu verlangsamen und
              einander dort zu unterstützen, wo es möglich ist.
            </p>
            <h2 color="secondary">Ziel und Vision der Initiative CoronaHelfer</h2>
            <ul>
              <li>CoronaHelfer schützt gefährdete Personen</li>
              <li>CoronaHelfer entlastet Menschen in systemrelevanten Berufen (Gesundheits-, Dienstleistungssystem
                etc.)
              </li>
              <li>CoronaHelfer unterstütz generell Hilfesuchende</li>
              <li>Coronaviurs-Nachbarschaftshilfe für alle!</li>
            </ul>
            <h2 color="secondary">Leitsätze für Coronavirus-Nachbarschaftshilfe</h2>
            <ul>
              <li><b>C</b>ool bleiben</li>
              <li><b>O</b>rdentlich Hände waschen</li>
              <li><b>R</b>ücksichtsvoll bleiben</li>
              <li><b>O</b>hne Hamsterkäufe</li>
              <li><b>N</b>achbarschaftshilfe</li>
              <li><b>A</b>bstand halten</li>
            </ul>
            <h2 color="secondary">Unser Hintergrund</h2>
            <p>
              Wie ist unsere Idee entstanden? Über soziale Netzwerke sind wir darauf aufmerksam geworden, wie unfassbar
              viele von euch in ihrer Umgebung Hilfe angesichts der aktuellen Situation anbieten möchten. Bei anderen
              Vermittlungsportalen fiel uns die große Anzahl an hilfsbereiten Menschen im Gegensatz zu nur wenigen
              Anfragen auf.<br/><br/>
              Wir haben erkannt, dass die Vermittlung von Fremden an Fremde eine große Herausforderung darstellt und
              machten uns die Sicherheit unserer Nutzer zur Aufgabe. Auch eine verlässliche und schnelle Vermittlung
              sowie die Einbindung bereits bestehender Offline-Arbeit vor Ort sind uns bei der
              Coronavirus-Nachbarschaftshilfe wichtig.<br/><br/>
              Dank des Hackathons #WirVsVirus der Bundesregierung haben wir ein tolles Team für unsere Idee gewinnen
              können. Seitdem arbeiten wir gemeinsam auf Hochtouren an der Umsetzung und dem Ausbau unserer
              Vermittlungsplattform
            </p>
          </article>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="sass">
  article
    margin: 20px auto 0
    max-width: 800px

  h2
    color: $secondary
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
