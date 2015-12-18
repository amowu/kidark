import malarkey from 'malarkey'
import React, { PropTypes } from 'react'
import Component from 'react-pure-render/component'

export default class Typewriter extends Component {
  constructor (props) {
    super(props)
    this.onFinish = this.onFinish.bind(this)
  }
  static propTypes = {
    children: PropTypes.string,
    deleteSpeed: PropTypes.number,
    loop: PropTypes.bool,
    onFinish: PropTypes.func,
    onStart: PropTypes.func,
    pauseDelay: PropTypes.number,
    postfix: PropTypes.string,
    speed: PropTypes.number,
    typeSpeed: PropTypes.number
  }
  static defaultProps = {
    children: '',
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
  componentWillUnmount () {
    this.onFinish()
  }
  onStart () {
    const { onStart } = this.props
    if (typeof onStart === 'function') onStart()
  }
  onFinish () {
    const { onFinish } = this.props
    if (typeof onFinish === 'function') onFinish()
  }
  triggerTypewriter () {
    const {
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

    this.onStart()

    malarkey(element, options)
      .clear()
      .type(children, speed)
      .call(this.onFinish)
  }
  render () {
    return (
      <p ref='typewriter'></p>
    )
  }
}
