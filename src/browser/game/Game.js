// WARNING: PIXI and Phaser module sequence can NOT change.
// otherwise it will show `PIXI not found or defined error`
import 'pixi'
import 'phaser'

import GameState from './states/GameState'

export default class Game extends Phaser.Game {
  constructor (width, height, parent) {
    super(width, height, Phaser.AUTO, parent)

    this.state.add('GameState', GameState, false)
    this.state.start('GameState')
  }

  setPushState (pushState) {
    this.pushState = pushState
  }
}
