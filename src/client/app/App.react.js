import './App.styl'
import Component from 'react-pure-render/component'
import Footer from './Footer.react'
import Header from './Header.react'
import React, {PropTypes} from 'react'
import RouterHandler from '../../common/components/RouterHandler.react'
import mapDispatchToProps from '../../common/app/mapDispatchToProps'
import mapStateToProps from '../../common/app/mapStateToProps'
import {connect} from 'react-redux'

import Game from './Game.react'

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  }

  render () {
    const {location: {pathname}, msg, users: {viewer}} = this.props

    return (
      // Pass data-pathname to allow route specific styling.
      <div className='page' data-pathname={pathname}>
        {/* Pathname enforces rerender so activeClassName is updated. */}
        <Header msg={msg} pathname={pathname} viewer={viewer} />
        <Game />
        <RouterHandler {...this.props} />
        <Footer msg={msg.app.footer} />
      </div>
    )
  }

}
