import React, { PropTypes } from 'react'
import { Image, Panel, Tab, Tabs } from 'react-bootstrap'
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

    const firstName = entities.getIn(['amowu', 'firstName'])
    const lastName = entities.getIn(['amowu', 'lastName'])

    return (
      <Panel>
        <div className='resume-profile'>
          <div>
            <Image src='http://www.gravatar.com/avatar/778858b33950746e7049bfc33e94ac50?s=128' />
            <h1>{firstName} {lastName}</h1>
          </div>
          <div>
            <p>Front-end Engineer</p>
          </div>
          <div>
            <dl>
              <dt>Location</dt>
              <dd>New Taipei City, Taiwan</dd>
              <dt>Industry</dt>
              <dd>Computer Software</dd>
            </dl>
          </div>
        </div>
        <Tabs defaultActiveKey={1} animation={false}>
          <Tab eventKey={1} title='Background'>
            <div className='resume-experience'>
              <h3>Experience</h3>
              <div>
                <Image />
                <h4>Gamania Digital Entertainment Co., Ltd.</h4>
                <h5>Senior Programmer</h5>
                <div>
                  <time>April 2011</time> – <time>August 2014</time> (3 years 5 months)
                </div>
              </div>
            </div>
            <div className='resume-education'>
              <h3>Education</h3>
              <div>
                <Image />
                <h4>National Taipei University of Technology</h4>
                <div>
                  <dl>
                    <dt>degree</dt>
                    <dd>Bachelor's degree</dd>
                    <dt>major</dt>
                    <dd>Computer Science and Information Engineering</dd>
                  </dl>
                </div>
                <div>
                  <time>2005</time> – <time>2009</time>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey={2} title='Skills'>skills</Tab>
        </Tabs>
      </Panel>
    )
  }
}
