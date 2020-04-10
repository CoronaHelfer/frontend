<template>
  <q-footer container="true">
    <q-toolbar class="footer-links">
      <q-tabs align="center">
        <q-route-tab to="/imprint" :label="$t('imprint')" />
        <q-route-tab to="/privacy" :label="$t('privacy')" />
      </q-tabs>
    </q-toolbar>
  </q-footer>
</template>

<style lang="sass" scoped>
footer
  position: initial
.footer-links
  justify-content: center
.sponsor
  float: right
</style>
