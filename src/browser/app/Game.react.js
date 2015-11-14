import React, {PropTypes} from 'react'
import Component from 'react-pure-render/component'

export default class Game extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  componentDidMount () {
    const {
      history: {
        pushState
      }
    } = this.props

    const PhaserGame = require('../game/Game')
    const game = new PhaserGame(320, 240, document.getElementById('game'))
    // TODO: Use better invoke solution
    game.setPushState(pushState)
  }

  render () {
    return (
      <div id='game'></div>
    )
  }
}
