import styles from './dialogue.css'

import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import Component from 'react-pure-render/component'

import Typewriter from './Typewriter'

export default class DialogueBox extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onTypewriterFinish = this.onTypewriterFinish.bind(this)
    this.onTypewriterStart = this.onTypewriterStart.bind(this)
  }
  static propTypes = {
    caret: PropTypes.bool,
    onClick: PropTypes.func,
    onTypewriterFinish: PropTypes.func,
    onTypewriterStart: PropTypes.func,
    text: PropTypes.string,
    typewriter: PropTypes.bool
  }
  static defaultProps = {
    caret: false,
    text: '',
    typewriter: true
  }
  componentDidUpdate (prevProps, prevState) {
    // Before: <DialogueBox typewriter />
    // After: <DialogueBox>
    // Call typewriter finished callback function
    if (this.props.typewriter === false) {
      this.onTypewriterFinish()
    }
  }
  onClick () {
    const { onClick } = this.props
    if (typeof onClick === 'function') onClick()
  }
  onTypewriterFinish () {
    const { onTypewriterFinish } = this.props
    if (typeof onTypewriterFinish === 'function') onTypewriterFinish()
  }
  onTypewriterStart () {
    const { onTypewriterStart } = this.props
    if (typeof onTypewriterStart === 'function') onTypewriterStart()
  }
  renderText () {
    const {
      text,
      typewriter
    } = this.props

    return typewriter
      ? <Typewriter
          onStart={this.onTypewriterStart}
          onFinish={this.onTypewriterFinish}>
          {text}
        </Typewriter>
      : <p>{text}</p>
  }
  renderCaret () {
    const { caret } = this.props
    return caret ? (
      <span
        className={styles['flex-center'] + ' glyphicon glyphicon-triangle-bottom'}
        aria-hidden='true'>
      </span>
    ) : null
  }
  render () {
    return (
      <Panel onClick={this.onClick}>
        {this.renderText()}
        {this.renderCaret()}
      </Panel>
    )
  }
}
