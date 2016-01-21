import BootState from './states/BootState'
import GameState from './states/GameState'
import PreloadState from './states/PreloadState'

export default class Game extends Phaser.Game {
  constructor (width, height, parent) {
    super(width, height, Phaser.AUTO, parent)

    this.state.add('BootState', BootState)
    this.state.add('PreloadState', PreloadState)
    this.state.add('GameState', GameState)

    this.state.start('BootState')
  }
}
