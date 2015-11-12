import React, {PropTypes} from 'react'
import DocumentTitle from 'react-document-title'
import Component from 'react-pure-render/component'
import {Link} from 'react-router'

export default class Home extends Component {
  static propTypes = {
    messages: PropTypes.object
  }

  render () {
    const {
      messages: {
        home: messages
      }
    } = this.props

    return (
      <DocumentTitle title={messages.title}>
        <div className='home-page'>
          <p>
            {messages.toCheck.isomorphicPage}{' '}
            <Link to='/this-is-not-the-web-page-you-are-looking-for'>404</Link>
          </p>
        </div>
      </DocumentTitle>
    )
  }
}
