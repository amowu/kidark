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

  it('should create CLEAR_CURRENT_DIALOGUE action when clearCurrentDialogue')
})
