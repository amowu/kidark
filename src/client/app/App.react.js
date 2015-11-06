import React, { PropTypes } from 'react'
import Component from 'react-pure-render/component'
import { connect } from 'react-redux'

import mapStateToProps from '../../common/app/mapStateToProps'
import mapDispatchToProps from '../../common/app/mapDispatchToProps'
import RouterHandler from '../../common/components/RouterHandler.react'
import Header from './Header.react'
import Game from './Game.react'

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    users: PropTypes.object
    messages: PropTypes.object.isRequired,
  }

  render () {
    const {
      location: { pathname },
      messages
    } = this.props

    return (
      <div className='page' data-pathname={pathname}>
        <Header msg={messages} pathname={pathname} />
        <Game />
        <RouterHandler {...this.props} />
      </div>
    )
  }
}
