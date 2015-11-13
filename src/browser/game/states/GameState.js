export default class GameState extends Phaser.State {
  init () {
    this.map = null
    this.layer = null
    this.player = null
    this.npc = null
    this.cursors = null

    this.world.setBounds(0, 0, 448, 496)
  }

  preload () {
    this.load.baseURL = '/'

    this.load.image('star', 'assets/images/star.png')
    this.load.spritesheet('pacman', 'assets/images/pacman.png', 32, 32)
    this.load.image('tiles', 'assets/images/pacman-tiles.png')
    this.load.tilemap('map', 'assets/pacman-map.json', null, Phaser.Tilemap.TILED_JSON)
  }

  create () {
    this.map = this.add.tilemap('map')
    this.map.addTilesetImage('pacman-tiles', 'tiles')
    this.layer = this.map.createLayer('Pacman')
    this.map.setCollisionByExclusion([14], true, this.layer)

    this.npc = this.add.sprite((14 * 16), (17 * 14), 'star')
    this.npc.anchor.set(0.5)
    this.physics.arcade.enable(this.npc)

    this.player = this.add.sprite((14 * 16) + 8, (17 * 16) + 8, 'pacman', 0)
    this.player.anchor.set(0.5)
    this.player.animations.add('munch', [0, 1, 2, 1], 20, true)
    this.player.animations.play('munch')
    this.physics.arcade.enable(this.player)
    this.player.body.setSize(16, 16, 0, 0)
    this.player.body.collideWorldBounds = true
    this.camera.follow(this.player)

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update () {
    this.physics.arcade.collide(this.player, this.layer)

    this.physics.arcade.overlap(this.player, this.npc, (player, npc) => {
      npc.kill()
      this.npc = null
      // TODO: Use better invoke solution
      this.game.pushState(null, '/user/amowu')
    })

    if (this.cursors.left.isDown) {
      this.player.scale.x = -1
      this.player.angle = 0
      this.player.body.velocity.x = -150
      this.player.body.velocity.y = 0
    } else if (this.cursors.right.isDown) {
      this.player.scale.x = 1
      this.player.angle = 0
      this.player.body.velocity.x = 150
      this.player.body.velocity.y = 0
    } else if (this.cursors.up.isDown) {
      this.player.scale.x = 1
      this.player.angle = 270
      this.player.body.velocity.x = 0
      this.player.body.velocity.y = -150
    } else if (this.cursors.down.isDown) {
      this.player.scale.x = 1
      this.player.angle = 90
      this.player.body.velocity.x = 0
      this.player.body.velocity.y = 150
    } else {
      this.player.body.velocity.x = 0
      this.player.body.velocity.y = 0
    }
  }
}
