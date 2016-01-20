import styles from './game.scss'

import React, { PropTypes } from 'react'
import Component from 'react-pure-render/component'

export default class Game extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };
  componentDidMount () {
    const PhaserGame = require('./PhaserGame.js')
    const game = new PhaserGame(480, 240, document.getElementById('game'))
    // TODO: define this.actions
    game.actions = this.props.actions
  }
  render () {
    return (
      <div id='game' className={styles.game}></div>
    )
  }
}
