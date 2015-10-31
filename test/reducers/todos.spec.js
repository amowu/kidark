import {expect} from 'chai'
import Immutable from 'immutable'

import todos from '../../src/common/todos/reducer'
import Todo from '../../src/common/todos/todo'

describe('reducers', () => {
  describe('todos reducer', () => {
    const initialState = Immutable.fromJS({
      list: [],
      newTodo: new Todo()
    })
    it('should handle initial state', () => {
      expect(
        todos(undefined, {})
      ).to.equal(
        initialState
      )
    })
    it('should handle ADD_TODO')
  })
})
