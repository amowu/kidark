import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import Component from 'react-pure-render/component'

import Typewriter from '../common/Typewriter'

export default class DialogueBox extends Component {
  constructor (props) {
    super(props)
    this.onFinish = this.onFinish.bind(this)
  }
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dialogue: PropTypes.object.isRequired,
    onFinish: PropTypes.func,
    pushState: PropTypes.func.isRequired
  }
  onNextClick () {
    const {
      actions,
      dialogue,
      pushState
    } = this.props

    if (dialogue.has('pushState')) {
      const state = dialogue.get('pushState')
      pushState(null, state)
    }

    actions.deleteCurrentDialogue()
  }
  onFinish () {
    if (typeof this.props.onFinish === 'function') this.props.onFinish()
  }
  render () {
    const {
      dialogue
    } = this.props

    const text = dialogue.get('text')

    // <p onClick={this.onNextClick.bind(this)}>{text}</p>
    return (
      <Panel>
        <Typewriter call={this.onFinish}>{text}</Typewriter>
      </Panel>
    )
  }
}
