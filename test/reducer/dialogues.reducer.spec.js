import {expect} from 'chai'
import {fromJS} from 'immutable'
import {indexBy} from 'lodash'
import serialize from 'serialize-javascript'

import dialogues from '../../src/common/dialogues/dialogues'
import dialoguesReducer from '../../src/common/dialogues/dialogues.reducer'

describe('dialogues reducer', () => {
  const normalizedDialogues = indexBy(dialogues, 'id')
  const expectedInitialState = fromJS({
    entities: normalizedDialogues
  })
  it('should return the initial state', () => {
    expect(
      dialoguesReducer(undefined, {})
    ).to.deep.equal(
      expectedInitialState
    )
  })

  const immutableState = fromJS({
    entities: normalizedDialogues
  })
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
})
