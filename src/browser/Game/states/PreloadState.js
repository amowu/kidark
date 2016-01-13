class PreloadState extends Phaser.State {
  preload () {
    this.load.baseURL = '/'

    this.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON)

    this.load.image('tilesheet', 'assets/img/tilesheet.png')

    this.load.spritesheet('codeer', 'assets/img/coder.png', 24, 24)
    this.load.spritesheet('clotharmor', 'assets/img/clotharmor.png', 32, 32)

    this.load.onLoadComplete.addOnce(() => {
      this.game.state.start('GameState')
    })
  }
}

export default PreloadState
