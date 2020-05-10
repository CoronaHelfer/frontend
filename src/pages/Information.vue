<template>
  <q-page>
    <div class="title row items-end">
      <div :class="$q.screen.gt.xs ? 'wrapper column' : 'column q-px-md'">
        <div class="banner-sub col">{{ $t('infoIntro') }}</div>
        <div
          class="banner-title col"
          :style="$q.screen.gt.xs ? '' : 'font-size:2.4rem'"
        >
          {{ $t('infoTitle') }}
        </div>
      </div>
    </div>
    <article :class="$q.screen.gt.xs ? 'wrapper' : 'q-mx-lg'">
      <h3 class="q-my-xl">{{ $t('infoSubIntro') }}</h3>
      <h3 class="uppercase">{{ $t('AlgTextTitle') }}</h3>
      <p>{{ $t('Alg1') }}</p>
      <p>{{ $t('Alg2') }}</p>
      <p>{{ $t('Alg3') }}</p>
      <p>{{ $t('Alg4') }}</p>
      <p>{{ $t('Alg5') }}</p>

      <h3 class="uppercase">{{ $t('HygieneTitle') }}</h3>
      <p>{{ $t('Hygiene1') }}</p>
      <p>{{ $t('Hygiene2') }}</p>
      <p>{{ $t('Hygiene3') }}</p>
      <p>{{ $t('Hygiene4') }}</p>
    </article>
  </q-page>
</template>

<style lang="sass" scoped>
.title
  background: url('../statics/images/Banner-Infos.jpg') no-repeat

article
  p:first-of-type
    margin-top: 5rem
</style>
