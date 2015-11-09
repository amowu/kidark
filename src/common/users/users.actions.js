export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'
export const FETCH_USER_START = 'FETCH_USER_START'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'

export function fetchUser () {
  return ({fetch}) => ({
    type: 'FETCH_USER',
    payload: {
      promise: fetch('api/v1/user/amowu')
        .then(response => response.json())
    }
  })
}
