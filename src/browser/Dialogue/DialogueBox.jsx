import styles from './dialogue.css'

import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import Component from 'react-pure-render/component'

import Typewriter from './Typewriter'

export default class DialogueBox extends Component {
  constructor (props) {
    super(props)
    this.onFinish = this.onFinish.bind(this)
    this.onStart = this.onStart.bind(this)
  }
  static propTypes = {
    caret: PropTypes.bool,
    onClick: PropTypes.func,
    onTypewriterFinish: PropTypes.func,
    onTypewriterStart: PropTypes.func,
    text: PropTypes.string,
    typewriter: PropTypes.bool
  };
  static defaultProps = {
    caret: false,
    text: '',
    typewriter: true
  };
  componentDidUpdate (prevProps, prevState) {
    // Before: <DialogueBox typewriter />
    // After: <DialogueBox>
    // Call typewriter finished callback function
    if (this.props.typewriter === false) {
      this.onFinish()
    }
  }
  onFinish () {
    const { onTypewriterFinish } = this.props
    if (typeof onTypewriterFinish === 'function') onTypewriterFinish()
  }
  onStart () {
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
          onStart={this.onStart}
          onFinish={this.onFinish}>
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
    const { onClick } = this.props
    return (
      <Panel onClick={() => {
        if (typeof onClick === 'function') onClick()
      }}>
        {this.renderText()}
        {this.renderCaret()}
      </Panel>
    )
  }
}
