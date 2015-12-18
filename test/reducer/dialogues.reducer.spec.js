import {expect} from 'chai'
import {fromJS} from 'immutable'
import {indexBy} from 'lodash'
import serialize from 'serialize-javascript'

import dialogues from '../../src/common/dialogues/dialogues'
import * as dialoguesActions from '../../src/common/dialogues/dialogues.actions'
import dialoguesReducer from '../../src/common/dialogues/dialogues.reducer'

describe('dialogues reducer', () => {
  const normalizedDialogues = indexBy(dialogues, 'id')
  const initialStateData = {
    entities: normalizedDialogues,
    items: {
      open: false
    },
    typewriter: {
      enabled: true,
      isRunning: false
    }
  }
  const expectedInitialState = fromJS(initialStateData)
  it('should return the initial state', () => {
    expect(
      dialoguesReducer(undefined, {})
    ).to.deep.equal(
      expectedInitialState
    )
  })

  const immutableState = fromJS(initialStateData)
  it('should return same state when action not match', () => {
    expect(
      dialoguesReducer(immutableState, {})
    ).to.deep.equal(
      immutableState
    )
  })

  const initialStateFromServer = JSON.parse(serialize(immutableState))
  it('should return revived state when server rendering', () => {
    expect(
      dialoguesReducer(initialStateFromServer, {})
    ).to.deep.equal(
      expectedInitialState
    )
  })

  const expectedCurrentDialogueId = '10001'
  const expectedStateAfterSetCurrentDialogue = immutableState.set('current', expectedCurrentDialogueId)
  it('should handle SET_CURRENT_DIALOGUE', () => {
    expect(
      dialoguesReducer(immutableState, dialoguesActions.setCurrentDialogue(expectedCurrentDialogueId))
    ).to.deep.equal(
      expectedStateAfterSetCurrentDialogue
    )
  })

  const expectedStateAfterDeleteCurrentDialogue = immutableState.delete('current')
  it('should handle DELETE_CURRENT_DIALOGUE', () => {
    expect(
      dialoguesReducer(expectedStateAfterSetCurrentDialogue, dialoguesActions.deleteCurrentDialogue())
    ).to.deep.equal(
      expectedStateAfterDeleteCurrentDialogue
    )
  })

  const expectedStateAfterOpenItemsMenu = immutableState.setIn(['items', 'open'], true)
  const expectedStateAfterCloseItemsMenu = immutableState.setIn(['items', 'open'], false)
  it('should handle SET_ITEMS_MENU_VISIBLE', () => {
    expect(
      dialoguesReducer(immutableState, dialoguesActions.openItemsMenu())
    ).to.deep.equal(
      expectedStateAfterOpenItemsMenu
    )
    expect(
      dialoguesReducer(immutableState, dialoguesActions.closeItemsMenu())
    ).to.deep.equal(
      expectedStateAfterCloseItemsMenu
    )
  })

  const expectedStateAfterResetTypewriter = immutableState.setIn(['typewriter', 'enabled'], true)
  const expectedStateAfterFinishTypewriter = immutableState.setIn(['typewriter', 'enabled'], false)
  it('should handle SET_TYPEWRITER_ENABLED', () => {
    expect(
      dialoguesReducer(immutableState, dialoguesActions.resetTypewriter())
    ).to.deep.equal(
      expectedStateAfterResetTypewriter
    )
    expect(
      dialoguesReducer(immutableState, dialoguesActions.finishTypewriter())
    ).to.deep.equal(
      expectedStateAfterFinishTypewriter
    )
  })

  const expectedStateAfterSetTypewriterRunIsTrue = immutableState.setIn(['typewriter', 'isRunning'], true)
  const expectedStateAfterSetTypewriterRunIsFalse = immutableState.setIn(['typewriter', 'isRunning'], false)
  it('should handle SET_TYPEWRITER_IS_RUN', () => {
    expect(
      dialoguesReducer(immutableState, dialoguesActions.setTypewriterIsRun(true))
    ).to.deep.equal(
      expectedStateAfterSetTypewriterRunIsTrue
    )
    expect(
      dialoguesReducer(immutableState, dialoguesActions.setTypewriterIsRun(false))
    ).to.deep.equal(
      expectedStateAfterSetTypewriterRunIsFalse
    )
  })
})
