import EasyStar from 'easystarjs'
import _ from 'lodash'

export default class GameState extends Phaser.State {
  init () {
    this.map = null
    this.layer = null
    this.player = null
    this.npc = null
    this.cursors = null
    this.marker = null

    this.playerNextMoveAllPath = null
    this.playerNextMovePath = null
    this.playerNextMoveX = 0
    this.playerNextMoveY = 0

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
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE

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

    this.playerNextMoveX = this.player.x
    this.playerNextMoveY = this.player.y

    this.cursors = this.input.keyboard.createCursorKeys()

    this.marker = this.add.graphics()
    this.marker.lineStyle(2, 0xff0000, 1)
    this.marker.drawRect(0, 0, 16, 16)

    // for A* map
    const grid = _.reduce(this.map.layers[0].data, (prev, curr) => {
      prev.push(_.pluck(curr, 'index'))
      return prev
    }, [])
    // setup A*
    const easystar = new EasyStar.js()
    easystar.setGrid(grid)
    easystar.setAcceptableTiles([14])
    // async function
    const calculatePath = (start, end) => {
      return new Promise((resolve) => {
        easystar.findPath(start.x, start.y, end.x, end.y, path => {
          resolve(path)
        })
        easystar.calculate()
      })
    }
    this.map.findPath = async (start, end) => await calculatePath(start, end)
    // mouse down
    this.input.onDown.add(() => {
      // player follow pathfinding
      this.map.findPath({
        x: this.layer.getTileX(this.player.x),
        y: this.layer.getTileY(this.player.y)
      }, {
        x: this.layer.getTileX(this.marker.x),
        y: this.layer.getTileY(this.marker.y)
      }).then(path => {
        // TODO: this.player.followPath(path)
        console.log('pathfinding:', path)
        if (path) {
          this.playerNextMoveAllPath = path
        }
      })
    })
  }

  update () {
    this.physics.arcade.collide(this.player, this.layer)
    this.physics.arcade.overlap(this.player, this.npc, (player, npc) => {
      npc.kill()
      this.npc = null
    })

    if (this.playerNextMoveAllPath !== null && this.playerNextMovePath === null) {
      console.log(this.playerNextMoveAllPath)
      if (this.playerNextMoveAllPath.length === 0) {
        this.playerNextMoveAllPath = null
        this.playerNextMovePath = null
        return
      }
      this.playerNextMovePath = this.playerNextMoveAllPath.shift()
      console.log(this.playerNextMovePath)
      this.playerNextMoveX = this.playerNextMovePath.x * 16
      this.playerNextMoveY = this.playerNextMovePath.y * 16
      console.log('player:', this.player.x, this.player.y)
      console.log('next:', this.playerNextMoveX, this.playerNextMoveY)
      this.physics.arcade.moveToXY(this.player, this.playerNextMoveX, this.playerNextMoveY)
    }

    if (this.playerNextMovePath !== null && this.physics.arcade.distanceToXY(this.player, this.playerNextMoveX, this.playerNextMoveY) === 0) {
      console.log('stop')
      this.player.body.velocity.x = 0
      this.player.body.velocity.y = 0
      this.playerNextMovePath = null
    }


    this.marker.x = this.layer.getTileX(this.input.activePointer.worldX) * 16
    this.marker.y = this.layer.getTileY(this.input.activePointer.worldY) * 16
  }
}
