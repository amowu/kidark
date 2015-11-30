import React, {PropTypes} from 'react'
import Component from 'react-pure-render/component'

export default class DialogueBox extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dialogues: PropTypes.object.isRequired
  }

  render () {
    // TODO: Use pure js object or immutable object in props?
    const {
      actions,
      dialogues
    } = this.props

    const enabled = dialogues.has('current')

    const dialogueId = dialogues.get('current')
    const dialoguesKeyPath = ['entities', dialogueId, 'text']
    const hasDialogue = (dialogueId) => dialogues.hasIn(dialoguesKeyPath)

    const elements = (enabled && hasDialogue(dialogueId)) ? (
      <section>
        <p>{dialogues.getIn(dialoguesKeyPath)}</p>
        <button onClick={actions.clearCurrentDialogue}>next</button>
      </section>
    ) : null// TODO: Exception a Error
    return (elements)
  }
}
