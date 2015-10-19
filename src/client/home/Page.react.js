import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import React, {PropTypes} from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';

export default class Page extends Component {

  static propTypes = {
    // Why not PropTypes.object.isRequired? Because:
    // https://github.com/rackt/react-router/issues/1505
    msg: PropTypes.object
  }

  render() {
    const {msg: {home: msg}} = this.props;

    return (
      <DocumentTitle title={msg.title}>
        <div className="home-page">
          <p>
            <FormattedHTMLMessage defaultMessage={msg.infoHtml} />
          </p>
          <div className="tocheck">
            <h2>{msg.toCheck.h2}</h2>
            <ul>
              {msg.toCheck.list.map(({key, text}) =>
                <li key={key}>
                  <FormattedHTMLMessage defaultMessage={text} />
                </li>
              )}
              <li>
                {msg.toCheck.isomorphicPage}{' '}
                <Link to="/this-is-not-the-web-page-you-are-looking-for">404</Link>
              </li>
              <li>
                {msg.toCheck.andMuchMore}
              </li>
            </ul>
          </div>
        </div>
      </DocumentTitle>
    );
  }

}
