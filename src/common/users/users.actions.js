export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'
export const FETCH_USER_START = 'FETCH_USER_START'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'

export function fetchUser () {
  return ({fetch}) => ({
    type: FETCH_USER,
    payload: {
      // TODO: Use env config to define api url
      promise: fetch('https://iogtezo43j.execute-api.ap-northeast-1.amazonaws.com/develop/users/amowu', {
        // TODO: Move to fetch.js headers and concact it
        headers: {
          'X-Parse-Application-Id': 'YzzvDHtGEsb40QFgxpu9paCNWsT6wf4gkVAP4OnI',
          'X-Parse-REST-API-Key': 'c1GFRAsJ6uI5YLN7innR6sZHtCf4vops6luOEMrC'
        }
      }).then(response => response.json())
    }
  })
}
