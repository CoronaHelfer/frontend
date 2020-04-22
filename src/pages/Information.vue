<template>
  <q-page>
    <div class="title"/>
    <article>
      <h3>{{$t('infoIntro')}}</h3>
      <h1>{{$t('infoTitle')}}</h1>

      <h3>{{$t('infoSubIntro')}}</h3>

      <h3 class="uppercase">{{$t('AlgTextTitle')}}</h3>
      <p>{{$t('Alg1')}}</p>
      <p>{{$t('Alg2')}}</p>
      <p>{{$t('Alg3')}}</p>
      <p>{{$t('Alg4')}}</p>
      <p>{{$t('Alg5')}}</p>

      <h3 class="uppercase">{{$t('HygieneTitle')}}</h3>
      <p>{{$t('Hygiene1')}}</p>
      <p>{{$t('Hygiene2')}}</p>
      <p>{{$t('Hygiene3')}}</p>
      <p>{{$t('Hygiene4')}}</p>

    </article>
  </q-page>
</template>

<style lang="sass" scoped>
  .title
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
      white-space: nowrap

    h3
      margin-top: 6.3rem

    a
      color: $secondary
</style>

<script>
export default {}
</script>
