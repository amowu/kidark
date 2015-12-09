import React, { PropTypes } from 'react'
import Component from 'react-pure-render/component'
import { Button } from 'react-toolbox/lib/button'
import { Card, CardActions, CardText, CardTitle } from 'react-toolbox/lib/card'

import { fetchUser } from '../../common/users/users.actions.js'
import fetch from '../components/fetch'

import style from './resume.css'

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

    const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'

    return (
      <Card>
        <CardTitle
          avatar='https://dl.dropboxusercontent.com/u/9860880/avatar.png'
          title={entities.getIn(['amowu', 'firstName'])}
          subtitle='Front-end Engineer'
        />
        <CardTitle
          title='Title goes here'
          subtitle='Subtitle here'
        />
        <CardText>{dummyText}</CardText>
        <CardActions className={style.card__actions}>
          <Button label='Action 1' />
          <Button label='Action 2' />
        </CardActions>
      </Card>
    )
  }
}
