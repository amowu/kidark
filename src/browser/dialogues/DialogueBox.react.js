import React, {PropTypes} from 'react'
import Component from 'react-pure-render/component'

export default class DialogueBox extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dialogue: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  }

  render () {
    const {
      dialogue
    } = this.props

    const text = dialogue.get('text')

    return (
      <section>
        <p onClick={this.onNextClick.bind(this)}>{text}</p>
      </section>
    )
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
}
