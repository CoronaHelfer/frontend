<template>
  <q-footer container="true" class="q-py-md">
    <q-toolbar class="wrapper row no-wrap items-center justify-between">
      <router-link to="/">
        <img class="logo" width="100" src="~assets/CoronaHelfer-Logo.svg" />
      </router-link>
      <q-tabs class="footer-links">
        <q-route-tab to="/imprint" :label="$t('imprint')" />
        <q-route-tab to="/privacy" :label="$t('privacy')" />
      </q-tabs>
      <div class="social-media">
        <a target="_blank" href="https://www.facebook.com/coronahelfer.eu/">
          <q-icon class="q-mr-sm" name="fab fa-facebook-f" size="sm" />
        </a>
        <a target="_blank" href="https://www.instagram.com/coronahelfer.eu/">
          <q-icon class="q-mr-sm" name="fab fa-instagram" size="sm" />
        </a>
        <a target="_blank" href="https://twitter.com/CoronahelferE">
          <q-icon class="q-mr-sm" name="fab fa-twitter" size="sm" />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/company/coronahelfer/"
        >
          <q-icon class="q-mr-sm" name="fab fa-linkedin-in" size="sm" />
        </a>
      </div>
    </q-toolbar>
  </q-footer>
</template>

<style lang="sass" scoped>
footer
  position: initial
  .footer-links div
    display: block
  .q-toolbar
    padding: 0
    .social-media
      a
        color: white
        justify-content: space-evenly
</style>
