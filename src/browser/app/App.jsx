import React, { PropTypes } from 'react'
import Component from 'react-pure-render/component'
import { connect } from 'react-redux'

import mapStateToProps from '../../common/app/mapStateToProps'
import mapDispatchToProps from '../../common/app/mapDispatchToProps'
import RouterHandler from '../../common/components/RouterHandler.react'
import Dialogue from '../Dialogue/Dialogue.jsx'
import Game from './Game.jsx'

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    dialogues: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  }

  render () {
    const {
      actions,
      dialogues,
      history: {
        pushState
      },
      location: {
        pathname
      }
    } = this.props

    return (
      <div data-pathname={pathname}>
        <Game {...{actions, pushState}} />
        <Dialogue {...{actions, dialogues, pushState}} />
        <RouterHandler {...this.props} />
      </div>
    )
  }
}
