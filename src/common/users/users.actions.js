export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'
export const FETCH_USER_START = 'FETCH_USER_START'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'

export function fetchUser () {
  return ({fetch}) => ({
    type: FETCH_USER,
    payload: {
      // TODO: Use env config to define api url
      promise: fetch('https://iogtezo43j.execute-api.ap-northeast-1.amazonaws.com/dev/users/amowu').then(response => response.json())
    }
  })
}
