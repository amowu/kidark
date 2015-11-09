import Component from 'react-pure-render/component'
import DocumentTitle from 'react-document-title'
import React, {PropTypes} from 'react'
import {FormattedHTMLMessage} from 'react-intl'
import {Link} from 'react-router'

export default class Page extends Component {

  static propTypes = {
    // Why not PropTypes.object.isRequired? Because:
    // https://github.com/rackt/react-router/issues/1505
    messages: PropTypes.object
  }

  render () {
    const {messages: {home: messages}} = this.props

    return (
      <DocumentTitle title={messages.title}>
        <div className='home-page'>
          <p>
            <FormattedHTMLMessage defaultMessage={messages.infoHtml} />
          </p>
          <div className='tocheck'>
            <h2>{messages.toCheck.h2}</h2>
            <ul>
              {messages.toCheck.list.map(({key, text}) =>
                <li key={key}>
                  <FormattedHTMLMessage defaultMessage={text} />
                </li>
              )}
              <li>
                {messages.toCheck.isomorphicPage}{' '}
                <Link to='/this-is-not-the-web-page-you-are-looking-for'>404</Link>
              </li>
              <li>
                {messages.toCheck.andMuchMore}
              </li>
            </ul>
          </div>
        </div>
      </DocumentTitle>
    )
  }

}
