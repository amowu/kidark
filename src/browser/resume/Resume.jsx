import styles from './resume.scss'

import React, { PropTypes } from 'react'
import { Modal, Tab, Tabs } from 'react-bootstrap'
import Component from 'react-pure-render/component'

import { fetchUser } from '../../common/users/users.actions.js'
import fetch from '../components/fetch'

import Background from './Background'
import Profile from './Profile'
import Project from './Project'
import Skill from './Skill'

class Resume extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  };
  close () {
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

    const projects = entities.getIn(['amowu', 'projects']).toJS()
    const skills = entities.getIn(['amowu', 'skills']).toJS()

    return (
      <Modal bsSize='lg' show animation={false} onHide={this.close.bind(this)}>
        <div className={'pull-right ' + styles['icons']}>
          <i className='fa fa-envelope fa-lg'></i>
        </div>
        <div className={'panel panel-default ' + styles['panel']}>
          <div className={'panel-body ' + styles['panel-body']}>
            <Profile {...{ name, info, contact, location, social }} />
            <Tabs defaultActiveKey={0} animation={false}>
              <Tab eventKey={0} title='Background'>
                <Background {...{ employment, education }} />
              </Tab>
              <Tab eventKey={1} title='Project'>
                <Project {...{ projects }} />
              </Tab>
              <Tab eventKey={2} title='Skill'>
                <Skill {...{ skills }} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </Modal>
    )
  }
}

export default fetch(fetchUser)(Resume)
