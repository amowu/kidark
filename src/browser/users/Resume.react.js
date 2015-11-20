import React, {PropTypes} from 'react'
import Component from 'react-pure-render/component'

import {fetchUser} from '../../common/users/users.actions.js'
import fetch from '../components/fetch'

@fetch(fetchUser)
export default class Resume extends Component {
  static propTypes = {
    $$users: PropTypes.object.isRequired
  }

  render () {
    const {
      $$users: {
        $$entities
      }
    } = this.props

    // TODO: Use :username replace 'amowu'
    if (!$$entities.has('amowu')) return <p>loading...</p>

    // TODO: Use :username replace 'amowu'
    return (
      <div>
        <h1>Resume</h1>
        <span>{$$entities.getIn(['amowu', 'firstName'])}</span>
      </div>
    )
  }
}
