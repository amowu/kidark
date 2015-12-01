import React, {PropTypes} from 'react'
import Component from 'react-pure-render/component'

import DialogueBox from './DialogueBox.react'
import DialogueItemBox from './DialogueItemBox.react'

export default class Dialogue extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dialogues: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  }

  render () {
    const {
      dialogues
    } = this.props

    const dialogueId = dialogues.get('current')

    return dialogues.has('current') ? (
      <div>
        {this.renderDialogueBox(dialogueId)}
        {this.renderDialogueItemBox(dialogueId)}
      </div>
    ) : null
  }

  renderDialogueBox (dialogueId) {
    const {
      actions,
      dialogues,
      pushState
    } = this.props

    const keyPath = ['entities', dialogueId]
    const dialogue = dialogues.getIn(keyPath)

    return (
      <DialogueBox {...{actions, dialogue, pushState}} />
    )
  }

  renderDialogueItemBox (dialogueId) {
    const {
      actions,
      dialogues
    } = this.props

    const itemsKeyPath = ['entities', dialogueId, 'items']

    return dialogues.hasIn(itemsKeyPath) ? (
      <DialogueItemBox items={dialogues.getIn(itemsKeyPath)} {...{actions}} />
    ) : null
  }
}
