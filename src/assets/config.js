const configuration = {
  development: {
    apiUrl: 'http://localhost:3000/api/v1' // 'https://dev.coronahelfer.eu/api/v1'
  },
  production: {
    apiUrl: 'https://coronahelfer.eu/api/v1'
  }
}

module.exports = function(environment) {
  return configuration[environment]
}
