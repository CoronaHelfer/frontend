<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  mounted() {
    const isTrackingDisabled = localStorage.getItem('ga-tracking-disabled')

    if (isTrackingDisabled !== '0' && isTrackingDisabled !== '1') {
      this.showConsentNotification()
    }
  },

  methods: {
    showConsentNotification() {
      this.$q.notify({
        message: this.$t('consentNotice'),
        html: true,
        color: 'primary',
        position: 'bottom-left',
        timeout: 0,
        actions: [
          { label: this.$t('allow'), color: 'white', handler: () => { localStorage.setItem('ga-tracking-disabled', '0') } },
          { label: this.$t('deny'), color: 'white', handler: () => { localStorage.setItem('ga-tracking-disabled', '1') } }
        ]
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.q-notification__actions
  .q-btn
    margin: 16px
    margin-right: 0
    margin-bottom: 8px
    font-weight: bold
</style>
