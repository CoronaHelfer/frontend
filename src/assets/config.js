const configuration = {
  development: {
    apiUrl: 'https://dev.coronahelfer.eu/api/v1'
  },
  production: {
    apiUrl: 'https://coronahelfer.eu/api/v1'
  }
}

module.exports = function(environment) {
  return configuration[environment]
}
