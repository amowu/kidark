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

    return <DialogueBox {...{actions, dialogue, pushState}} />
  }
  renderDialogueItemBox (dialogueId) {
    const {
      actions
    } = this.props

    const onItemSelect = (event, dialogueId) => {
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
    return this.hasItems(dialogueId) ? (
      <Dropdown
        id='required-dialogue-dropdown'
        className={styles['dropdown']}
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
