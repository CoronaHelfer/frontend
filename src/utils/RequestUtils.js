export default {
  notify: function (quasar, error) {
    console.error(error)
    let errorMessage = 'Verbindungsfehler'
    let icon = 'report_problem'
    if (error.response.status === 401) {
      errorMessage = 'Anmeldung fehlgeschlagen'
      icon = 'lock'
    }
    quasar.notify({
      color: 'negative',
      position: 'bottom',
      message: errorMessage,
      icon: icon
    })
  },

  login: function (axios, quasar, email, password) {
    return axios.post(quasar.sessionStorage.getItem('server') + '/auth/login', { password: password })
      .catch((error) => { this.notify(quasar, error) })
  }
}
