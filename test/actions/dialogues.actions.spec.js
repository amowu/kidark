import {expect} from 'chai'

import * as dialoguesActions from '../../src/common/dialogues/dialogues.actions'

describe('dialogues actions', () => {
  it('should create SET_CURRENT_DIALOGUE action when setCurrentDialogue', () => {
    const dialogueId = '10001'
    expect(
      dialoguesActions.setCurrentDialogue(dialogueId)
    ).to.deep.equal({
      type: dialoguesActions.SET_CURRENT_DIALOGUE,
      payload: dialogueId
    })
  })

  it('should create DELETE_CURRENT_DIALOGUE action when deleteCurrentDialogue', () => {
    expect(
      dialoguesActions.deleteCurrentDialogue()
    ).to.deep.equal({
      type: dialoguesActions.DELETE_CURRENT_DIALOGUE
    })
  })

  it('should create SET_ITEMS_MENU_VISIBLE action when openItemsMenu', () => {
    expect(
      dialoguesActions.openItemsMenu()
    ).to.deep.equal({
      type: dialoguesActions.SET_ITEMS_MENU_VISIBLE,
      payload: true
    })
  })

  it('should create SET_ITEMS_MENU_VISIBLE action when closeItemsMenu', () => {
    expect(
      dialoguesActions.closeItemsMenu()
    ).to.deep.equal({
      type: dialoguesActions.SET_ITEMS_MENU_VISIBLE,
      payload: false
    })
  })
})
