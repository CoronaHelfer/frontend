<template>
  <q-page>
    <div class="title" />
    <article>
      <h3>{{ $t('jobsSubtitle') }}</h3>
      <h1>{{ $t('jobsTitle') }}</h1>

      <p>{{ $t('jobsIntro') }}</p>

      <h3 class="uppercase">{{ $t('jobsResponsibilities') }}</h3>
      <p>{{ $t('jobsResp1') }}</p>
      <p>{{ $t('jobsResp2') }}</p>
      <p>{{ $t('jobsResp3') }}</p>

      <h3 class="uppercase">{{ $t('jobsQualifications') }}</h3>
      <p>{{ $t('jobsQual1') }}</p>
      <p>{{ $t('jobsQual2') }}</p>
      <p>{{ $t('jobsQual3') }}</p>
      <p>{{ $t('jobsQual4') }}</p>
      <p>{{ $t('jobsQual5') }}</p>

      <h3 class="uppercase">{{ $t('jobsContact1') }}</h3>
      {{ $t('jobsContact2') }}:
      <a href="mailto:info@coronahelfer.eu">info@coronahelfer.eu</a>
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
