import React, {PropTypes} from 'react'
import DocumentTitle from 'react-document-title'
import Component from 'react-pure-render/component'
import {Link} from 'react-router'

export default class NotFound extends Component {
  static propTypes = {
    messages: PropTypes.object
  }

  render () {
    const {
      messages: {
        notFound: messages
      }
    } = this.props

    return (
      <DocumentTitle title={messages.title}>
        <div className='notfound-page'>
          <h1>{messages.header}</h1>
          <p>{messages.message}</p>
          <Link to='/'>{messages.continueMessage}</Link>
        </div>
      </DocumentTitle>
    )
  }
}
