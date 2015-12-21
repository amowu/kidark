import styles from './game.css'

import React, { PropTypes } from 'react'
import Component from 'react-pure-render/component'

export default class Game extends Component {
  static propTypes = {
    actions: PropTypes.object,
    pushState: PropTypes.func
  }

  componentDidMount () {
    const {
      actions: {
        setCurrentDialogue
      },
      pushState
    } = this.props

    const PhaserGame = require('../Game/Game.js')
    const game = new PhaserGame('100%', '100%', document.getElementById('game'))

    // TODO: Use better invoke solution
    game.setPushState(pushState)
    game.setCurrentDialogue(setCurrentDialogue)
  }

  render () {
    return (
      <div id='game' className={styles.game}></div>
    )
  }
}
