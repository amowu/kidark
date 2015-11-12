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
