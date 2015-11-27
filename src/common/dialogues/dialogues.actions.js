export const CLEAR_CURRENT_DIALOGUE = 'CLEAR_CURRENT_DIALOGUE'
export const SET_CURRENT_DIALOGUE = 'SET_CURRENT_DIALOGUE'

export function clearCurrentDialogue () {
  return {
    type: CLEAR_CURRENT_DIALOGUE
  }
}

export function setCurrentDialogue (dialogueId) {
  return {
    type: SET_CURRENT_DIALOGUE,
    payload: dialogueId
  }
}
