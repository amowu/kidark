import EasyStar from 'easystarjs'
import _ from 'lodash'

export default class GameState extends Phaser.State {
  init () {
    this.map = null
    this.layer = null
    this.player = null
    this.npc = null
    this.marker = null

    this.TILE_SIZE = 16
  }

  preload () {
    this.load.baseURL = '/'
    this.load.image('tilesheet', 'assets/img/tilesheet.png')
    this.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.spritesheet('clotharmor', 'assets/img/clotharmor.png', 32, 32)
    this.load.spritesheet('codeer', 'assets/img/coder.png', 24, 24)
  }

  create () {
    this.input.maxPointers = 1
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.minWidth = 480
    this.scale.minHeight = 240
    this.scale.maxWidth = 1440
    this.scale.maxHeight = 720
    // this.stage.forcePortrait = false
    // this.input.addPointer()
    // this.stage.backgroundColor = '#111111'

    this.world.setBounds(0, 0, (60 * this.TILE_SIZE), (60 * this.TILE_SIZE))

    this.map = this.add.tilemap('map')
    this.map.addTilesetImage('tilesheet')

    // this.layer = this.map.createLayer('c')
    this.layer = this.map.createLayer('layer0')
    this.map.createLayer('layer1')
    this.map.createLayer('layer2')
    this.map.createLayer('layer3')
    this.map.createLayer('layer4')

    this.npc = this.add.sprite((9 * this.TILE_SIZE), (12 * this.TILE_SIZE), 'codeer')
    this.npc.anchor.set(0.25)
    this.npc.animations.add('idle_down', [0, 1], 8, true)
    this.npc.animations.play('idle_down')
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

    this.player = this.add.sprite((12 * this.TILE_SIZE), (15 * this.TILE_SIZE), 'clotharmor')
    this.player.anchor.setTo(0.25, 0.375)
    this.player.animations.add('walk_right', [5, 6, 7, 8], 8, true)
    this.player.animations.add('idle_right', [10, 11], 2, true)
    this.player.animations.add('walk_up', [20, 21, 22, 23], 8, true)
    this.player.animations.add('idle_up', [25, 26], 2, true)
    this.player.animations.add('walk_down', [35, 36, 37, 38], 8, true)
    this.player.animations.add('idle_down', [40, 41], 2, true)
    this.player.animations.play('idle_down')
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
        x: x * this.TILE_SIZE,
        y: y * this.TILE_SIZE
      }, 100)
      return tween
    }
    this.player.moveInPath = () => {
      if (this.player.currentTweens.length === 0) return
      // why index is start with 1?
      // because need to exclude self position in this path
      let index = 1
      this.player.isMoving = true
      const moveToNext = (tween) => {
        const updateAnimation = () => {
          const { x: nextX, y: nextY } = tween.timeline[0].vEnd
          if (nextX > this.player.x) {
            this.player.anchor.setTo(0.25, 0.375)
            this.player.scale.x = 1
            if (this.player.animations.currentAnim.name === 'walk_right') return
            return this.player.animations.play('walk_right')
          }
          if (nextX < this.player.x) {
            this.player.anchor.setTo(0.75, 0.375)
            this.player.scale.x = -1
            if (this.player.animations.currentAnim.name === 'walk_right') return
            return this.player.animations.play('walk_right')
          }
          if (nextY > this.player.y) {
            this.player.anchor.setTo(0.25, 0.375)
            this.player.scale.x = 1
            if (this.player.animations.currentAnim.name === 'walk_down') return
            return this.player.animations.play('walk_down')
          }
          if (nextY < this.player.y) {
            this.player.anchor.setTo(0.25, 0.375)
            this.player.scale.x = 1
            if (this.player.animations.currentAnim.name === 'walk_up') return
            return this.player.animations.play('walk_up')
          }
        }
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

        updateAnimation()

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
      if (this.player.animations.currentAnim.name === 'walk_right') {
        this.player.animations.play('idle_right')
      }
      if (this.player.animations.currentAnim.name === 'walk_up') {
        this.player.animations.play('idle_up')
      }
      if (this.player.animations.currentAnim.name === 'walk_down') {
        this.player.animations.play('idle_down')
      }
      this.player.resetCurrentTweens()
    }

    this.marker = this.add.graphics()
    this.marker.lineStyle(2, 0xff0000, 1)
    this.marker.drawRect(0, 0, this.TILE_SIZE, this.TILE_SIZE)

    // for A* map
    const grid = _.reduce(this.map.layers[this.map.getLayerIndex('c')].data, (prev, curr) => {
      prev.push(_.pluck(curr, 'index'))
      return prev
    }, [])
    // setup A*
    const easystar = new EasyStar.js() // eslint-disable-line
    easystar.setGrid(grid)
    easystar.setAcceptableTiles([27])
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
    this.marker.x = this.layer.getTileX(this.input.activePointer.worldX) * this.TILE_SIZE
    this.marker.y = this.layer.getTileY(this.input.activePointer.worldY) * this.TILE_SIZE
  }
}
