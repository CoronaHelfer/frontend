export const callApi = async (
  url = '',
  token = '',
  data = {},
  method = 'GET'
) => {
  const response = await fetch(url, {
    method,
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': token
    },
    body:
        method === 'POST' || method === 'PUT' ? JSON.stringify(data) : undefined // body data type must match "Content-Type" header
  })
  return await response.json() // parses JSON response into native JavaScript objects
}
