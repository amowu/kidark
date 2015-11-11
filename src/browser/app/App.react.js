import React, {PropTypes} from 'react'
import Component from 'react-pure-render/component'
import {connect} from 'react-redux'

import mapStateToProps from '../../common/app/mapStateToProps'
import mapDispatchToProps from '../../common/app/mapDispatchToProps'
import RouterHandler from '../../common/components/RouterHandler.react'
import Game from './Game.react'

// TODO: Remove it
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
      location: {pathname},
      messages,
      history
    } = this.props

    return (
      <div className='page' data-pathname={pathname}>
        <Header msg={messages} pathname={pathname} />
        <Game history={history} />
        <RouterHandler {...this.props} />
      </div>
    )
  }
}
