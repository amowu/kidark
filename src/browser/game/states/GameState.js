export default class GameState extends Phaser.State {
  preload () {
    this.game.load.spritesheet('dude', '/assets/img/dude.png', 32, 48)
    this.game.load.image('star', '/assets/img/star.png')
  }

  create () {
    this.star = this.game.add.sprite(0, 5 * 22, 'star')
    this.game.physics.arcade.enable(this.star)

    this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude')
    this.player.animations.add('left', [0, 1, 2, 3], 10, true)
    this.player.animations.add('right', [5, 6, 7, 8], 10, true)
    this.game.physics.arcade.enable(this.player)
    this.player.body.collideWorldBounds = true

    this.cursors = this.game.input.keyboard.createCursorKeys()
  }

  update () {
    this.player.body.velocity.x = 0
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150
      this.player.animations.play('left')
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150
      this.player.animations.play('right')
    } else {
      this.player.animations.stop()
      this.player.frame = 4
    }

    this.game.physics.arcade.overlap(this.player, this.star, (player, star) => {
      star.kill()
      this.game.pushState(null, '/user/amowu')
    })
  }
}
