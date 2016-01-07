import styles from './game.css'

import React, { PropTypes } from 'react'
import Component from 'react-pure-render/component'

export default class Game extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };
  componentDidMount () {
    const PhaserGame = require('../Game/Game.js')
    const game = new PhaserGame(480, 240, document.getElementById('game'))
    game.actions = this.props.actions
  }
  render () {
    return (
      <div id='game' className={styles.game}></div>
    )
  }
}
