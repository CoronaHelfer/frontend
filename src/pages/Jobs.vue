<template>
  <q-page>
    <div class="title row items-end">
      <div :class="$q.screen.gt.xs ? 'wrapper column' : 'column q-px-md'">
        <div class="banner-sub col">{{ $t('jobsSubtitle') }}</div>
        <div class="banner-title col">{{ $t('jobsTitle') }}</div>
      </div>
    </div>
    <article :class="$q.screen.gt.xs ? 'wrapper' : 'q-mx-lg'">
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
  background: url('../statics/images/Banner-Jobs.jpg') no-repeat
  background-size: cover
  background-color: $secondary

article
  p:first-of-type
    margin-top: 5rem
</style>
