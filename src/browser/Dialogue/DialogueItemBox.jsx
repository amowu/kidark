import React, {PropTypes} from 'react'
import Component from 'react-pure-render/component'

export default class DialogueItemBox extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired
  }

  render () {
    const {
      items
    } = this.props

    return (
      <ol>
        {items.map((item, index) =>
          <li key={index} onClick={this.onItemClick.bind(this, item)}>
            {item.get('text')}
          </li>
        )}
      </ol>
    )
  }

  onItemClick (item) {
    const {
      actions
    } = this.props

    if (item.has('dialogue')) {
      const dialogueId = item.get('dialogue')
      return actions.setCurrentDialogue(dialogueId)
    }

    return actions.deleteCurrentDialogue()
  }
}
