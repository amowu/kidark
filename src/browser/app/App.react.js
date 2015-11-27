import React, {PropTypes} from 'react'
import Component from 'react-pure-render/component'
import {connect} from 'react-redux'

import mapStateToProps from '../../common/app/mapStateToProps'
import mapDispatchToProps from '../../common/app/mapDispatchToProps'
import RouterHandler from '../../common/components/RouterHandler.react'
import Dialogue from './Dialogue.react'
import Game from './Game.react'
import Header from './Header.react'

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    $$users: PropTypes.object.isRequired
  }

  render () {
    const {
      history,
      location: {
        pathname
      },
      messages
    } = this.props

    return (
      <div className='page' data-pathname={pathname}>
        <Header messages={messages} pathname={pathname} />
        <Dialogue />
        <RouterHandler {...this.props} />
      </div>
    )
  }
}
