import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import Component from 'react-pure-render/component'

import Typewriter from '../common/Typewriter'

export default class DialogueBox extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dialogue: PropTypes.object.isRequired,
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
  render () {
    const {
      dialogue
    } = this.props

    const text = dialogue.get('text')

    // <p onClick={this.onNextClick.bind(this)}>{text}</p>
    return (
      <Panel>
        <Typewriter>{text}</Typewriter>
      </Panel>
    )
  }
}
