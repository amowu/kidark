import {expect} from 'chai'

import * as actions from '../../src/common/todos/actions'
import Todo from '../../src/common/todos/todo'

describe('actions', () => {
  describe('todos', () => {
    it('addTodo should create ADD_TODO action', () => {
      const todo = new Todo()
      expect(actions.addTodo(todo)).to.deep.equal({
        type: actions.ADD_TODO,
        payload: {
          todo: todo
        }
      })
    })
  })
})
