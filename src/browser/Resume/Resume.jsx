import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import Component from 'react-pure-render/component'

import { fetchUser } from '../../common/users/users.actions.js'
import fetch from '../components/fetch'

@fetch(fetchUser)
export default class Resume extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired
  }

  render () {
    const {
      users: {
        entities
      }
    } = this.props

    // TODO: Use :username or users.current
    if (!entities.has('amowu')) return <p>fetching user...</p>

    return (
      <div>
        <div>{entities.getIn(['amowu', 'firstName'])}</div>
        <Button bsStyle='primary'>Primary</Button>
      </div>
    )
  }
}
