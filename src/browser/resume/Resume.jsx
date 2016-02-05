import styles from './resume.scss'

import React, { PropTypes } from 'react'
import { Modal, Tab, Tabs } from 'react-bootstrap'
import Component from 'react-pure-render/component'

import { fetchUser } from '../../common/users/users.actions.js'
import fetch from '../components/fetch'

import Background from './Background'
import Profile from './Profile'

class Resume extends Component {
  constructor (props) {
    super(props)
    this.onClose = this.onClose.bind(this)
  }
  static propTypes = {
    history: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  };
  onClose () {
    const {
      history: {
        pushState
      }
    } = this.props
    // route to root location
    pushState('/')
  }
  render () {
    const {
      users
    } = this.props

    const entities = users.get('entities')

    // TODO: Use :username or users.current
    if (!entities.has('amowu')) {
      return (
        <div className={styles['spinner']}>
          <i className='fa fa-spinner fa-5x fa-spin'></i>
        </div>
      )
    }

    const name = entities.getIn(['amowu', 'name'])
    const info = entities.getIn(['amowu', 'info']).toJS()
    const contact = entities.getIn(['amowu', 'contact']).toJS()
    const location = entities.getIn(['amowu', 'location']).toJS()
    const social = entities.getIn(['amowu', 'social']).toJS()
    const employment = entities.getIn(['amowu', 'employment']).toJS()
    const education = entities.getIn(['amowu', 'education']).toJS()

    return (
      <Modal bsSize='lg' show animation={false} onHide={this.onClose}>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <Profile {...{ name, info, contact, location, social }} />
            <Tabs defaultActiveKey={0} animation={false}>
              <Tab eventKey={0} title='Background'>
                <Background {...{ employment, education }} />
              </Tab>
              <Tab eventKey={1} title='Project' disabled></Tab>
              <Tab eventKey={2} title='Skill' disabled></Tab>
            </Tabs>
          </div>
        </div>
      </Modal>
    )
  }
}

export default fetch(fetchUser)(Resume)
