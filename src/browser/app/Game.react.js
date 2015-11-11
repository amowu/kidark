import React, {PropTypes} from 'react'
import Component from 'react-pure-render/component'

export default class Game extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  componentDidMount () {
    let star
    let player
    let cursors
    const game = new Phaser.Game(320, 240, Phaser.AUTO, document.getElementById('game'), {
      preload: () => {
        game.load.spritesheet('dude', '/assets/img/dude.png', 32, 48)
        game.load.image('star', '/assets/img/star.png')
      },
      create: () => {
        star = game.add.sprite(0, 5 * 22, 'star')
        game.physics.arcade.enable(star)

        player = game.add.sprite(32, game.world.height - 150, 'dude')
        player.animations.add('left', [0, 1, 2, 3], 10, true)
        player.animations.add('right', [5, 6, 7, 8], 10, true)
        game.physics.arcade.enable(player)
        player.body.collideWorldBounds = true

        cursors = game.input.keyboard.createCursorKeys()
      },
      update: () => {
        player.body.velocity.x = 0
        if (cursors.left.isDown) {
          player.body.velocity.x = -150
          player.animations.play('left')
        } else if (cursors.right.isDown) {
          player.body.velocity.x = 150
          player.animations.play('right')
        } else {
          player.animations.stop()
          player.frame = 4
        }

        game.physics.arcade.overlap(player, star, (player, star) => {
          star.kill()
          this.props.history.pushState(null, '/user/amowu')
        })
      }
    })
  }
  render () {
    return (
      <div id='game'></div>
    )
  }
}
