<template>
  <q-header class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-toolbar-title>
        <router-link to="/">
          <img class="logo" width="100" src="~assets/CoronaHelfer-Logo.svg" />
        </router-link>
      </q-toolbar-title>
      <q-tabs v-if="$q.screen.gt.xs" shrink stretch align="right">
        <q-route-tab to="/help" :label="$t('help')" />
        <q-route-tab to="/get-help" :label="$t('getHelp')" />
        <q-route-tab to="/information" :label="$t('information')" />
        <q-route-tab to="/jobs" :label="$t('jobs')" />
      </q-tabs>
      <q-btn v-else flat dense round aria-label="Menu" icon="menu">
        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <q-list style="min-width: 100px;">
            <q-item to="/help" clickable>
              <q-item-section>{{ $t('help') }}</q-item-section>
            </q-item>
            <q-item to="/get-help" clickable>
              <q-item-section>{{ $t('getHelp') }}</q-item-section>
            </q-item>
            <q-separator />
            <q-item to="/information" clickable>
              <q-item-section>{{ $t('information') }}</q-item-section>
            </q-item>
            <q-item to="/jobs" clickable>
              <q-item-section>{{ $t('jobs') }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <ProfileButton />
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
