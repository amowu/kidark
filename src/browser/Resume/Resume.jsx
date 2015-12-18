import styles from './resume.css'

import React, { PropTypes } from 'react'
import { Image, Modal, Tab, Tabs } from 'react-bootstrap'
import Component from 'react-pure-render/component'

import { fetchUser } from '../../common/users/users.actions.js'
import fetch from '../components/fetch'

@fetch(fetchUser)
export default class Resume extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  }
  close () {
    const {
      history: {
        pushState
      }
    } = this.props

    pushState('/')
  }
  render () {
    const {
      users: {
        entities
      }
    } = this.props

    // TODO: Use :username or users.current
    if (!entities.has('amowu')) {
      return (
        <div className={styles['spinner']}>
          <i className='fa fa-spinner fa-5x fa-spin'></i>
        </div>
      )
    }

    const firstName = entities.getIn(['amowu', 'firstName'])
    const lastName = entities.getIn(['amowu', 'lastName'])

    // TODO: <Profile />
    const profile = (
      <div className={'media ' + styles['profile-media']}>
        <div className='media-left'>
          <Image src='http://www.gravatar.com/avatar/778858b33950746e7049bfc33e94ac50?s=120' />
        </div>
        <div className={'media-body ' + styles['profile-media-body']}>
          <h2 className={styles['formatted-name']}>{firstName} {lastName}</h2>
          <h4 className={styles['headline']}>Front-end Engineer at KidArk</h4>
          <address className={styles['location']}>
            <span className='fa fa-map-marker' aria-hidden='true'></span>
            <span className='sr-only'>Location:</span>
            New Taipei City, Taiwan
          </address>
        </div>
      </div>
    )

    // TODO: <Experience>
    const experience = (
      <div>
        <h5 className={styles['background-heading']}>Experience</h5>
        <div className='media'>
          <div className={'media-left ' + styles['background-media-left']}>
            <Image src='https://upload.wikimedia.org/wikipedia/zh/7/7f/Gamania_Logo.png' responsive />
          </div>
          <div className={'media-body ' + styles['background-media-body']}>
            <h4 className={styles['background-media-body-heading']}>Gamania Digital Entertainment Co., Ltd.</h4>
            <h5 className={styles['background-media-body-subheading']}>
              Senior Programmer
              <small>April 2011 – August 2014 (3 years 5 months)</small>
            </h5>
          </div>
        </div>
      </div>
    )

    // TODO: <Education />
    const education = (
      <div>
        <h5 className={styles['background-heading']}>Education</h5>
        <div className='media'>
          <div className={'media-left ' + styles['background-media-left']}>
            <Image src='https://media.licdn.com/mpr/mpr/shrink_200_200/p/6/005/0a5/02d/015e2ec.png' responsive />
          </div>
          <div className={'media-body ' + styles['background-media-body']}>
            <h4 className={styles['background-media-body-heading']}>National Taipei University of Technology</h4>
            <h5 className={styles['background-media-body-subheading']}>
              Bachelor's degree, Computer Science and Information Engineering
              <small>2005 – 2009</small>
            </h5>
          </div>
        </div>
      </div>
    )

    // TODO: <Background />
    const background = (
      <div>
        {experience}
        {education}
      </div>
    )

    return (
      <Modal bsSize='lg' show animation={false} onHide={this.close.bind(this)}>
        <div className={'pull-right ' + styles['icons']}>
          <i className='fa fa-envelope fa-lg'></i>
        </div>
        <div className={'panel panel-default ' + styles['panel']}>
          <div className={'panel-body ' + styles['panel-body']}>
            {profile}
            <Tabs defaultActiveKey={0} animation={false}>
              <Tab eventKey={0} title='Background'>
                {background}
              </Tab>
              <Tab eventKey={1} title='Skills'>🚧</Tab>
            </Tabs>
          </div>
        </div>
      </Modal>
    )
  }
}
