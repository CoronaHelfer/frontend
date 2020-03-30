<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar class="nav">
      <q-toolbar-title>
        <router-link to="/">
          <img class="logo" width="100" src="~assets/CoronaHelfer-Logo.svg" />
        </router-link>
      </q-toolbar-title>
      <q-tabs align="right">
        <q-route-tab to="/help" label="Helfen" />
        <q-route-tab to="/get-help" label="Hilfe Bekommen" />
        <q-route-tab to="/flyer" label="Flyer" />
        <q-route-tab to="/information" label="Informationen" />
        <q-route-tab to="/contact" label="Kontakt" />
      </q-tabs>
      <ProfileButton/>
    </q-toolbar>
  </q-header>
</template>

<style lang="sass" scoped>
.nav
  width: 100%
  display: flex
  background-color: $primary
  color: WHITE
  justify-content: space-between
  box-sizing: border-box
  height: 90px
  padding: 0 80px
.logo
  margin: 0.75rem
.login-btn
  background: #ef7d18
  color: white
</style>

<script>
import ProfileButton from './ProfileButton'

export default {
  components: { ProfileButton }
}
</script>
