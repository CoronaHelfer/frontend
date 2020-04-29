<template>
  <q-footer class="q-pt-xl q-pb-md">
    <div class="q-mb-md">
      <q-toolbar class="wrapper row no-wrap items-center justify-between">
        <router-link to="/">
          <img class="logo" width="100" src="~assets/CoronaHelfer-Logo.svg" />
        </router-link>
        <q-select
          class="locale-selector"
          label-color="white"
          color="white"
          v-model="locale"
          :options="localeOptions"
          :label="$t('language')"
          dense
          borderless
          emit-value
          map-options
          options-dense
          dark
        />
      </q-toolbar>
    </div>
    <div class="q-mb-sm">
      <q-toolbar class="wrapper row no-wrap items-center justify-center">
        <div class="social-media">
          <a target="_blank" href="https://www.facebook.com/coronahelfer.eu/">
            <q-icon class="q-mx-sm" name="fab fa-facebook-f" size="sm" />
          </a>
          <a target="_blank" href="https://www.instagram.com/coronahelfer.eu/">
            <q-icon class="q-mx-sm" name="fab fa-instagram" size="sm" />
          </a>
          <a target="_blank" href="https://twitter.com/CoronahelferE">
            <q-icon class="q-mx-sm" name="fab fa-twitter" size="sm" />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/company/coronahelfer/"
          >
            <q-icon class="q-mx-sm" name="fab fa-linkedin-in" size="sm" />
          </a>
        </div>
      </q-toolbar>
    </div>
    <q-toolbar class="wrapper row justify-center">
      <q-tabs class="footer-links">
        <q-route-tab to="/imprint" :label="$t('imprint')" />
        <q-route-tab to="/privacy" :label="$t('privacy')" />
      </q-tabs>
    </q-toolbar>
  </q-footer>
</template>

<script>
export default {
  data() {
    return {
      locale: this.$i18n.locale,
      localeOptions: [
        { value: 'en_US', label: 'English' },
        { value: 'de_DE', label: 'Deutsch' }
      ]
    }
  },

  watch: {
    locale(locale) {
      console.log(locale)
      this.$i18n.locale = locale
    }
  }
}
</script>

<style lang="sass" scoped>
footer
  position: initial
  .locale-selector
    min-width: 100px
  .q-toolbar
    padding: 0
    .social-media
      a
        color: white
        justify-content: space-evenly
</style>
