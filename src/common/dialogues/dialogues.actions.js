export const DELETE_CURRENT_DIALOGUE = 'DELETE_CURRENT_DIALOGUE'
export const DELETE_CURRENT_ITEMS = 'DELETE_CURRENT_ITEMS'
export const SET_CURRENT_DIALOGUE = 'SET_CURRENT_DIALOGUE'
export const SET_CURRENT_ITEMS = 'SET_CURRENT_ITEMS'
export const SET_ITEMS_MENU_VISIBLE = 'SET_ITEMS_MENU_VISIBLE'
export const SET_TYPEWRITER_ENABLED = 'SET_TYPEWRITER_ENABLED'
export const SET_TYPEWRITER_IS_RUN = 'SET_TYPEWRITER_IS_RUN'

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

export function openItemsMenu () {
  return {
    type: SET_ITEMS_MENU_VISIBLE,
    payload: true
  }
}
export function closeItemsMenu () {
  return {
    type: SET_ITEMS_MENU_VISIBLE,
    payload: false
  }
}

export function resetTypewriter () {
  return {
    type: SET_TYPEWRITER_ENABLED,
    payload: true
  }
}
export function finishTypewriter () {
  return {
    type: SET_TYPEWRITER_ENABLED,
    payload: false
  }
}

export function setTypewriterIsRun (isRunning) {
  return {
    type: SET_TYPEWRITER_IS_RUN,
    payload: isRunning
  }
}
