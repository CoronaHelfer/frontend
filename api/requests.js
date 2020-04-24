const baseUrl = 'https://dev.coronahelfer.eu/api/v1'

export const callApi = async (
  url = '',
  token = '',
  data = {},
  method = 'GET'
) => {
  const response = await fetch(baseUrl + url, {
    method,
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': token
      // Authorization: `Bearer ${token}`
    },
    body:
      method === 'POST' || method === 'PUT' || method === 'DELETE'
        ? JSON.stringify(data)
        : undefined // body data type must match "Content-Type" header
  })
  return await response.json() // parses JSON response into native JavaScript objects
}

export const authApi = async (data = {}, auth = 'login') => {
  const response = await fetch(`${baseUrl}/auth/${auth}`, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await response.json()
}
