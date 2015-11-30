export const DELETE_CURRENT_DIALOGUE = 'DELETE_CURRENT_DIALOGUE'
export const DELETE_CURRENT_ITEMS = 'DELETE_CURRENT_ITEMS'
export const SET_CURRENT_DIALOGUE = 'SET_CURRENT_DIALOGUE'
export const SET_CURRENT_ITEMS = 'SET_CURRENT_ITEMS'

export function setCurrentDialogue (dialogueId) {
  return {
    type: SET_CURRENT_DIALOGUE,
    payload: dialogueId
  }
}

export function deleteCurrentDialogue () {
  return {
    type: DELETE_CURRENT_DIALOGUE
  }
}
