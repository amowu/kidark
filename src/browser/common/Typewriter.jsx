import malarkey from 'malarkey'
import React, { PropTypes } from 'react'
import Component from 'react-pure-render/component'

export default class Typewriter extends Component {
  static propTypes = {
    children: PropTypes.string,
    call: PropTypes.func,
    deleteSpeed: PropTypes.number,
    loop: PropTypes.bool,
    pauseDelay: PropTypes.number,
    postfix: PropTypes.string,
    speed: PropTypes.number,
    typeSpeed: PropTypes.number
  }
  static defaultProps = {
    deleteSpeed: 50,
    loop: false,
    pauseDelay: 2000,
    postfix: '',
    typeSpeed: 50
  }
  componentDidMount () {
    this.triggerTypewriter()
  }
  componentDidUpdate (prevProps, prevState) {
    this.triggerTypewriter()
  }
  triggerTypewriter () {
    const {
      call,
      children,
      deleteSpeed,
      loop,
      pauseDelay,
      postfix,
      speed,
      typeSpeed
    } = this.props

    const element = this.refs.typewriter
    const options = { deleteSpeed, loop, pauseDelay, postfix, typeSpeed }

    const m = malarkey(element, options).clear().type(children, speed)
    if (typeof call === 'function') m.call(call)
  }
  render () {
    return (
      <p ref='typewriter'></p>
    )
  }
}
