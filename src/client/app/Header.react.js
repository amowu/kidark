import Component from 'react-pure-render/component'
import React, {PropTypes} from 'react'
import {Link} from 'react-router'

export default class Header extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired
  }

  render () {
    const {msg: {app: {links: msg}}} = this.props

    return (
      <header>
        <h1>
          <Link to='/'>{msg.home}</Link>
        </h1>
        <ul>
          <li><Link to='/user/amowu'>Resume</Link></li>
          <li><Link activeClassName='active' to='/todos'>{msg.todos}</Link></li>
        </ul>
      </header>
    )
  }

}
