<template>
  <q-page>
    <div class="title"/>
    <article>
      <h3>{{$t('imprintIntro')}}</h3>
      <h1>{{$t('imprintTitle')}}</h1>

      <h3 class="uppercase">{{$t('imprintServiceTitle')}}</h3>
      <p>{{$t('imprintService1')}}</p>
      <p>{{$t('imprintService2')}}</p>
      <p>{{$t('imprintService3')}}</p>
      <p>{{$t('imprintService4')}}</p>

      <h3 class="uppercase">{{$t('imprintContactTitle')}}</h3>
      <p>{{$t('imprintContact1')}}<a href="mailto:info@coronahelfer.eu"> info@coronahelfer.eu</a></p>

      <h3 class="uppercase">{{$t('imprintSMTitle')}}</h3>
      <p>{{$t('imprintSM1')}}</p>
      <p>Facebook: <a href="https://www.facebook.com/coronahelfer.eu/">https://www.facebook.com/coronahelfer.eu/</a></p>
      <p>Instagram: <a href="https://www.instagram.com/coronahelfer.eu/">https://www.instagram.com/coronahelfer.eu/</a></p>
      <p>Twitter: <a href="https://twitter.com/CoronahelferE">https://twitter.com/CoronahelferE</a></p>

      <h3 class="uppercase">{{$t('imprintCRTitle')}}</h3>
      <p>{{$t('printCR1')}}</p>

      <p><a href="https://datenschutz-generator.de/?l=de">Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas Schwenke</a></p>
    </article>
  </q-page>
</template>

<style lang="sass" scoped>
  .title
    text-align: center
    background: url('../statics/images/Banner-Imprint.jpg') no-repeat
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
      white-space: nowrap

    h3
      margin-top: 6.3rem
</style>
