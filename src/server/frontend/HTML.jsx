import React, {Component, PropTypes} from 'react'

export default class HTML extends Component {
  static propTypes = {
    appCssFilename: PropTypes.string,
    bodyHTML: PropTypes.string.isRequired,
    googleAnalyticsId: PropTypes.string.isRequired,
    isProduction: PropTypes.bool.isRequired
  };
  render () {
    const {
      appCssFilename, bodyHTML, googleAnalyticsId, isProduction
    } = this.props

    const linkStyles = appCssFilename &&
      <link
        href={appCssFilename}
        rel='stylesheet'
      />

    const analytics = isProduction && googleAnalyticsId !== 'UA-XXXXXXX-X' &&
      <script
        dangerouslySetInnerHTML={{__html: `
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=ri[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date()a=s.createElement(o),
m=s.getElementsByTagName(o)[0]a.async=1a.src=gm.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga')
ga('create', '${googleAnalyticsId}', 'auto') ga('send', 'pageview')`}}
      />

    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta content='width=device-width, initial-scale=1, shrink-to-fit=no' name='viewport' />
          <meta content='ie=edge' httpEquiv='x-ua-compatible' />
          <title>Amo Wu</title>
          {linkStyles}
          {analytics}
        </head>
        <body dangerouslySetInnerHTML={{__html: bodyHTML}} />
      </html>
    )
  }
}
