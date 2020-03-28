<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-toolbar-title>
        <!-- <q-avatar> -->
        <img class="logo" width="100" src="~assets/CoronaHelfer-Logo.svg" />
        <!-- </q-avatar> -->
      </q-toolbar-title>
      <q-tabs align="right">
        <q-route-tab to="#" label="Helfen" />
        <q-route-tab to="#" label="Hilfe Bekommen" />
        <q-route-tab to="#" label="Flyer" />
        <q-route-tab to="#" label="Informationen" />
        <q-route-tab to="#" label="Kontakt" />
        <q-btn to="#" class="login-btn" label="Login" />
      </q-tabs>
    </q-toolbar>
  </q-header>
</template>

<style lang="sass" scoped>
.logo
  margin: 0.75rem
.login-btn
  background: #ef7d18
  color: white
</style>
