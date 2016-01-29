class BootState extends Phaser.State {
  create () {
    // max number of fingers to detect
    this.input.maxPointers = 1

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    this.game.scale.minWidth = 480
    this.game.scale.minHeight = 240
    this.game.scale.maxWidth = 1440
    this.game.scale.maxHeight = 720

    this.game.state.start('PreloadState')
  }
}

export default BootState
