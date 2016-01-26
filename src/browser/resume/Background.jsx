import React, { PropTypes } from 'react'
import Component from 'react-pure-render/component'

import Education from './Education'
import Employment from './Employment'

export default class Background extends Component {
  static propTypes = {
    education: PropTypes.object,
    employment: PropTypes.object
  };
  render () {
    const {
      education,
      employment
    } = this.props
    return (
      <div>
        <Employment {...{ employment }} />
        <Education {...{ education }} />
      </div>
    )
  }
}
