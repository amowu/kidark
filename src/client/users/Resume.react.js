import React from 'react'
import DocumentTitle from 'react-document-title'
import Component from 'react-pure-render/component'

export default class Resume extends Component {
  render () {
    return (
      <DocumentTitle title='Resume'>
        <div>Resume</div>
      </DocumentTitle>
    )
  }
}
