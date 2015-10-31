import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import {expect} from 'chai'

import Todo from '../../src/client/todos/Todo.react'

describe('components', () => {
  const props = {
    todo: {
      title: 'item'
    }
  }
  const renderer = ReactTestUtils.createRenderer()
  renderer.render(
    <Todo {...props} />
  )
  const output = renderer.getRenderOutput()

  describe('Todo', () => {
    it('should initial render', () => {
      expect(output.type).to.equal('li')
      expect(output.props.className).to.equal('todo')

      const [view, button] = output.props.children

      expect(view.type).to.equal('span')
      expect(view.props.className).to.equal('view')
      expect(view.props.children).to.equal('item')

      expect(button.type).to.equal('span')
      expect(button.props.className).to.equal('button')
    })
  })
})
