<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <q-page-container style="padding-top:0">
      <router-view />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<style lang="sass" scoped>
body
  background-color: $background

  main
    margin: 0 auto
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
