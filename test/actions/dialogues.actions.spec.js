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
  it('should create SET_TYPEWRITER_ENABLED action when resetTypewriter', () => {
    expect(
      dialoguesActions.resetTypewriter()
    ).to.deep.equal({
      type: dialoguesActions.SET_TYPEWRITER_ENABLED,
      payload: true
    })
  })
  it('should create SET_TYPEWRITER_ENABLED action when finishTypewriter', () => {
    expect(
      dialoguesActions.finishTypewriter()
    ).to.deep.equal({
      type: dialoguesActions.SET_TYPEWRITER_ENABLED,
      payload: false
    })
  })
  it('should create SET_TYPEWRITER_IS_RUN action when setTypewriterIsRun', () => {
    expect(
      dialoguesActions.setTypewriterIsRun(true)
    ).to.deep.equal({
      type: dialoguesActions.SET_TYPEWRITER_IS_RUN,
      payload: true
    })
    expect(
      dialoguesActions.setTypewriterIsRun(false)
    ).to.deep.equal({
      type: dialoguesActions.SET_TYPEWRITER_IS_RUN,
      payload: false
    })
  })
})
