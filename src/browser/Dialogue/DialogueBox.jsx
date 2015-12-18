import styles from './dialogue.css'

import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import Component from 'react-pure-render/component'

import Typewriter from '../common/Typewriter'

export default class DialogueBox extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onFinish = this.onFinish.bind(this)
  }
  static propTypes = {
    caret: PropTypes.bool,
    onClick: PropTypes.func,
    onFinish: PropTypes.func,
    text: PropTypes.string
  }
  static defaultProps = {
    caret: false
  }
  onClick () {
    if (typeof this.props.onClick === 'function') this.props.onClick()
  }
  onFinish () {
    if (typeof this.props.onFinish === 'function') this.props.onFinish()
  }
  renderCaret () {
    return this.props.caret ? (
      <span
        className={styles['flex-center'] + ' glyphicon glyphicon-triangle-bottom'}
        aria-hidden='true'>
      </span>
    ) : null
  }
  render () {
    const {
      text
    } = this.props

    return (
      <Panel onClick={this.onClick}>
        <Typewriter call={this.onFinish}>{text}</Typewriter>
        {this.renderCaret()}
      </Panel>
    )
  }
}
