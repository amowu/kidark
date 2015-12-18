import styles from './dialogue.css'

import React, {PropTypes} from 'react'
import { Col, Dropdown, Grid, MenuItem, Row } from 'react-bootstrap'
import Component from 'react-pure-render/component'

import DialogueBox from './DialogueBox'

export default class Dialogue extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dialogues: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  }
  hasItems (dialogueId) {
    const { dialogues } = this.props
    const itemsKeyPath = ['entities', dialogueId, 'items']
    return dialogues.hasIn(itemsKeyPath)
  }
  getItems (dialogueId) {
    const { dialogues } = this.props
    const itemsKeyPath = ['entities', dialogueId, 'items']
    return dialogues.getIn(itemsKeyPath)
  }
  renderDialogueBox (dialogueId) {
    const {
      actions,
      dialogues,
      pushState
    } = this.props

    const keyPath = ['entities', dialogueId]
    const dialogue = dialogues.getIn(keyPath)
    const text = dialogue.get('text')
    const caret = !this.hasItems(dialogueId)

    const onClick = () => {
      if (this.hasItems(dialogueId)) return
      if (dialogue.has('pushState')) {
        pushState(null, dialogue.get('pushState'))
      }
      actions.deleteCurrentDialogue()
    }
    const onFinish = () => actions.openItemsMenu()

    return <DialogueBox {...{onClick, onFinish, caret, text}} />
  }
  renderDialogueItemBox (dialogueId) {
    const {
      actions
    } = this.props

    const onItemSelect = (event, dialogueId) => {
      actions.closeItemsMenu()
      if (dialogueId) {
        actions.setCurrentDialogue(dialogueId)
      } else {
        actions.deleteCurrentDialogue(dialogueId)
      }
    }

    return this.hasItems(dialogueId) ? (
      <Dropdown.Menu>
        {this.getItems(dialogueId).map((item, index) =>
          <MenuItem
            key={index}
            eventKey={item.get('dialogue')}
            onSelect={onItemSelect}>
            {item.get('text')}
          </MenuItem>
        )}
      </Dropdown.Menu>
    ) : null
  }
  renderDialogue (dialogueId) {
    const {
      dialogues
    } = this.props

    return this.hasItems(dialogueId) ? (
      <Dropdown
        id='required-dialogue-dropdown'
        className={styles['dropdown']}
        open={dialogues.getIn(['items', 'open'])}
        onToggle={(isOpen) => {}}
        dropup
        pullRight>
        <div bsRole='toggle'>{this.renderDialogueBox(dialogueId)}</div>
        {this.renderDialogueItemBox(dialogueId)}
      </Dropdown>
    ) : this.renderDialogueBox(dialogueId)
  }
  render () {
    const { dialogues } = this.props
    const dialogueId = dialogues.get('current')

    return dialogues.has('current') ? (
      <div className={styles['fullscreen-flex']}>
        <Grid>
          <Row>
            <Col md={12}>{this.renderDialogue(dialogueId)}</Col>
          </Row>
        </Grid>
      </div>
    ) : null
  }
}
