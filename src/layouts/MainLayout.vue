<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <q-page-container style="padding-bottom: 0">
      <router-view />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<style lang="sass" scoped>
  div
    background: url('../statics/background.jpg') no-repeat
    background-size: cover
</style>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  components: {
    Header,
    Footer
  },
  name: 'MainLayout'
}
</script>
