import styles from './dialogue.css'

import React, {PropTypes} from 'react'
import { Col, Dropdown, Grid, MenuItem, Row } from 'react-bootstrap'
import DropdownMenu from 'react-bootstrap/lib/DropdownMenu'
import Component from 'react-pure-render/component'

import DialogueBox from './DialogueBox'

// TODO: refactor this shit
export default class Dialogue extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dialogues: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  }
  hasItems (dialogueId) {
    const { dialogues } = this.props
    return dialogues.hasIn(['entities', dialogueId, 'items'])
  }
  getItems (dialogueId) {
    const { dialogues } = this.props
    return dialogues.getIn(['entities', dialogueId, 'items'])
  }
  renderDialogueBox (dialogueId) {
    const {
      actions,
      dialogues,
      pushState
    } = this.props

    const dialogue = dialogues.getIn(['entities', dialogueId])
    const text = dialogue.get('text')
    const caret = !this.hasItems(dialogueId)
    const typewriter = dialogues.getIn(['typewriter', 'enabled'])

    const onTypewriterStart = () => {
      actions.setTypewriterIsRun(true)
    }
    const onTypewriterFinish = () => {
      actions.setTypewriterIsRun(false)
      actions.openItemsMenu()
    }
    const onClick = () => {
      // 1. Stop dialogue typewrite
      if (dialogues.getIn(['typewriter', 'isRunning'])) actions.finishTypewriter()
      // 2. Do nothing when dialogue has items
      if (this.hasItems(dialogueId)) return
      // 3. Execute this dialogue's action
      if (dialogue.has('pushState')) pushState(null, dialogue.get('pushState'))
      // 4. Exit this dialogue
      actions.deleteCurrentDialogue()
    }

    return <DialogueBox {...{
      caret,
      onClick,
      onTypewriterFinish,
      onTypewriterStart,
      text,
      typewriter
    }} />
  }
  // TODO: move to DialogueItemBox.jsx
  renderDialogueItemBox (dialogueId) {
    const {
      actions
    } = this.props

    const onItemSelect = (event, dialogueId) => {
      actions.closeItemsMenu()
      if (dialogueId) {
        actions.resetTypewriter()
        actions.setCurrentDialogue(dialogueId)
      } else {
        actions.deleteCurrentDialogue(dialogueId)
      }
    }
    return this.hasItems(dialogueId) ? (
      <DropdownMenu>
        {this.getItems(dialogueId).map((item, index) =>
          <MenuItem
            key={index}
            eventKey={item.get('dialogue')}
            onSelect={onItemSelect}>
            {item.get('text')}
          </MenuItem>
        )}
      </DropdownMenu>
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
