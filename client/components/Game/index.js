import 'pixi.js'
import 'p2'
import 'phaser'
import React, { Component } from 'react'

import PhaserGame from '../../games/PhaserGame'

class Game extends Component {
  componentDidMount () {
    this.game = new PhaserGame(480, 240, Phaser.AUTO, document.getElementById('game'))
  }

  render () {
    return (
      <div id='game'></div>
    )
  }
}

export default Game
