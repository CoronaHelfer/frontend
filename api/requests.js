// const configuration = require('../src/assets/config')

export const callApi = async (
  path = '',
  token = '',
  data = {},
  method = 'GET'
) => {
  const response = await fetch(`https://api.coronahelfer.net/api/v1${path}`, {
    method,
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body:
      method === 'POST' || method === 'PUT' || method === 'DELETE'
        ? JSON.stringify(data)
        : undefined // body data type must match "Content-Type" header
  })
  return await response.json() // parses JSON response into native JavaScript objects
}

export const authApi = async (data = {}, auth = 'login') => {
  const response = await fetch(`https://api.coronahelfer.net/api/v1/auth/${auth}`, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    return response.status
  }

  return await response.json()
}
