import React, {PropTypes} from 'react'
import Component from 'react-pure-render/component'

import fetch from '../../common/components/fetch'
import {fetchUser} from '../../common/users/users.actions.js'

@fetch(fetchUser)
export default class Resume extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired
  }

  render () {
    const {users: {entities}} = this.props

    if (!entities.has('26')) return <p>loading...</p>

    return (
      <div>
        <h1>Resume</h1>
        <span>{entities.getIn(['26', 'firstName'])}</span>
      </div>
    )
  }
}