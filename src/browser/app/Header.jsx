import React, {PropTypes} from 'react'
import Component from 'react-pure-render/component'
import {Link} from 'react-router'

export default class Header extends Component {
  static propTypes = {
    messages: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired
  };
  render () {
    const {
      messages: {
        app: {
          links: messages
        }
      }
    } = this.props

    return (
      <header>
        <h1>
          <Link to='/'>{messages.home}</Link>
        </h1>
        <ul>
          <li><Link to='/user/amowu'>Resume</Link></li>
        </ul>
      </header>
    )
  }
}
