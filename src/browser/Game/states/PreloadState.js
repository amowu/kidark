class PreloadState extends Phaser.State {
  preload () {
    this.load.baseURL = '/'

    this.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON)

    this.load.spritesheet('clotharmor', 'assets/img/clotharmor.png', 32, 32)
    this.load.spritesheet('codeer', 'assets/img/coder.png', 24, 24)
    this.load.spritesheet('desertnpc', 'assets/img/desertnpc.png', 24, 24)
    this.load.spritesheet('guard', 'assets/img/guard.png', 25, 24)
    this.load.spritesheet('villager', 'assets/img/villager.png', 24, 24)
    this.load.spritesheet('villagegirl', 'assets/img/villagegirl.png', 24, 24)

    this.load.image('tilesheet', 'assets/img/tilesheet.png')

    this.load.onLoadComplete.addOnce(() => {
      this.game.state.start('GameState')
    })
  }
}

export default PreloadState
