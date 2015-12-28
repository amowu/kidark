import EasyStar from 'easystarjs'
import _ from 'lodash'

export default class GameState extends Phaser.State {
  init () {
    this.map = null
    this.layer = null

    this.player = null
    this.npc = null

    this.marker = null
  }

  preload () {
    this.load.baseURL = '/'
    this.load.image('star', 'assets/images/star.png')
    this.load.spritesheet('pacman', 'assets/images/pacman.png', 32, 32)
    this.load.image('tiles', 'assets/images/pacman-tiles.png')
    this.load.tilemap('map', 'assets/pacman-map.json', null, Phaser.Tilemap.TILED_JSON)
  }

  create () {
    // this.scale.scaleMode = Phaser.ScaleManager.RESIZE

    this.world.setBounds(0, 0, 448, 496)

    this.map = this.add.tilemap('map')
    this.map.addTilesetImage('pacman-tiles', 'tiles')
    this.layer = this.map.createLayer('Pacman')

    this.player = this.add.sprite((14 * 16), (17 * 16), 'pacman', 0)
    // this.player.anchor.set(0.5)
    this.player.animations.add('munch', [0, 1, 2, 1], 20, true)
    this.player.animations.play('munch')
    this.camera.follow(this.player)
    this.player.currentTweens = []
    this.player.isMoving = false
    this.player.tweenInProgress = false
    this.player.onFollowComplete = null
    this.player.followPath = (path, onFollowComplete) => {
      this.player.onFollowComplete = onFollowComplete
      this.player.resetCurrentTweens()
      this.player.prepareMovement(path)
      this.player.moveInPath()
    }
    this.player.resetCurrentTweens = () => {
      this.player.currentTweens.map(tween => this.tweens.remove(tween))
      this.player.currentTweens = []
      this.player.isMoving = false
    }
    this.player.prepareMovement = (path) => {
      path = path || []
      this.player.currentTweens = []
      path.map(point => {
        this.player.currentTweens.push(this.player.getTweenToCoordinate(point.x, point.y))
      })
    }
    this.player.getTweenToCoordinate = (x, y) => {
      const tween = this.add.tween(this.player.position)
      tween.to({
        x: x * 16,
        y: y * 16
      }, 100)
      return tween
    }
    this.player.moveInPath = () => {
      if (this.player.currentTweens.length === 0) return

      // why index is start with 1?
      // since exclude self position in path
      let index = 1
      this.player.isMoving = true
      const moveToNext = (tween) => {
        const onComplete = () => {
          this.player.onStopMovement()
          // trigger onComplete callback
          if (typeof this.player.onFollowComplete === 'function') {
            this.player.onFollowComplete()
          }
        }
        // prevent no progress when path only 1
        if (!tween) {
          return onComplete()
        }
        index++
        const nextTween = this.player.currentTweens[index]
        if (nextTween) {
          tween.onComplete.add(() => {
            this.player.tweenInProgress = false
            moveToNext(nextTween)
          })
        } else {
          tween.onComplete.add(onComplete)
        }
        tween.start()
        this.player.tweenInProgress = true
      }
      moveToNext(this.player.currentTweens[index])
    }
    this.player.onStopMovement = () => {
      this.player.resetCurrentTweens()
    }

    this.npc = this.add.sprite((13 * 16), (14 * 16), 'star')
    // this.npc.anchor.set(0.5)
    this.npc.inputEnabled = true
    this.npc.input.priorityID = 2
    this.npc.events.onInputDown.add((sprite, pointer) => {
      this.map.findPath({
        x: this.layer.getTileX(this.player.x),
        y: this.layer.getTileY(this.player.y)
      }, {
        x: this.layer.getTileX(sprite.x),
        y: this.layer.getTileY(sprite.y)
      }).then(path => {
        if (path) {
          // remove npc self position
          path.pop()
          this.player.followPath(path, () => {
            // TODO: this.game.actions[setCurrentDialogue, dialoagueId]
            this.game.actions.setCurrentDialogue('10001')
          })
        }
      })
    })

    this.marker = this.add.graphics()
    this.marker.lineStyle(2, 0xff0000, 1)
    this.marker.drawRect(0, 0, 16, 16)

    // for A* map
    const grid = _.reduce(this.map.layers[0].data, (prev, curr) => {
      prev.push(_.pluck(curr, 'index'))
      return prev
    }, [])
    // setup A*
    const easystar = new EasyStar.js() // eslint-disable-line
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
    this.layer.inputEnabled = true
    this.layer.input.priorityID = 1
    this.layer.events.onInputDown.add(() => {
      this.map.findPath({
        x: this.layer.getTileX(this.player.x),
        y: this.layer.getTileY(this.player.y)
      }, {
        x: this.layer.getTileX(this.marker.x),
        y: this.layer.getTileY(this.marker.y)
      }).then(path => {
        if (path) {
          this.player.followPath(path)
        }
      })
    })
  }

  update () {
    this.marker.x = this.layer.getTileX(this.input.activePointer.worldX) * 16
    this.marker.y = this.layer.getTileY(this.input.activePointer.worldY) * 16
  }
}
