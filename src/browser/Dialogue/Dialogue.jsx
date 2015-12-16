import styles from './dialogue.css'

import React, {PropTypes} from 'react'
import { Col, Grid, Row } from 'react-bootstrap'
import Component from 'react-pure-render/component'

import DialogueBox from './DialogueBox'
import DialogueItemBox from './DialogueItemBox'

export default class Dialogue extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dialogues: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
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
  render () {
    const {
      dialogues
    } = this.props

    const dialogueId = dialogues.get('current')

    return dialogues.has('current') ? (
      <div className={styles['dialogue-box']}>
        <Grid>
          <Row>
            <Col xs={12}>
              {this.renderDialogueBox(dialogueId)}
              {this.renderDialogueItemBox(dialogueId)}
            </Col>
          </Row>
        </Grid>
      </div>
    ) : null
  }
}
