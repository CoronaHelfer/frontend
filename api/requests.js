export const callApi = async (
  url = '',
  token = '',
  data = {},
  method = 'GET',
  headers = {
    'Content-Type': 'application/json',
    'X-Access-Token': token
  }
) => {
  const response = await fetch(url, {
    method,
    mode: 'cors',
    cache: 'no-cache',
    headers: headers,
    body:
        method === 'POST' || method === 'PUT' || method === 'DELETE' ? JSON.stringify(data) : undefined // body data type must match "Content-Type" header
  })
  return await response.json() // parses JSON response into native JavaScript objects
}
