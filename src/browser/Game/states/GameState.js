import { forEach, get } from 'lodash'

import Map from '../prefabs/Map'
import Player from '../prefabs/Player'
import NPC from '../prefabs/NPC'

// TODO: move to json
import NPCData from '../data/npc'

class GameState extends Phaser.State {
  init () {
    this.map = null
    this.layer = null
    this.player = null
    this.marker = null

    this.TILE_SIZE = 16
  }

  create () {
    this.world.setBounds(0, 0, (60 * this.TILE_SIZE), (60 * this.TILE_SIZE))

    this.map = new Map(this.game, 'map')
    this.map.addOnInputDown((layer, input) => {
      this.map.findPath(this.player, {
        x: get(input, 'worldX'),
        y: get(input, 'worldY')
      }).then(path => {
        if (path) {
          this.player.followPath(path)
        }
      })
    })

    this._setupNPC()

    this.player = new Player(this.game, (12 * this.TILE_SIZE), (10 * this.TILE_SIZE), 'clotharmor')
    this.game.add.existing(this.player)

    this.marker = this.add.graphics()
    this.marker.lineStyle(2, 0xff0000, 1)
    this.marker.drawRect(0, 0, this.TILE_SIZE, this.TILE_SIZE)

    this.camera.follow(this.player)
  }

  _setupNPC () {
    // TODO: refactor to NPCFactory.create
    const data = get(NPCData, 'data')

    const onNPCInputDown = (npc) => {
      this.map.findPath(this.player, npc).then(path => {
        if (path) {
          path.pop()// remove NPC self position
          this.player.followPath(path, () => {
            npc.triggerAction()
          })
        }
      })
    }

    forEach(data, (npc) => {
      const {
        key,
        position: {
          x,
          y
        },
        frameRate,
        dialogue
      } = npc
      const instance = new NPC(this.game, (x * this.TILE_SIZE), (y * this.TILE_SIZE), key)
      instance.animations.add('idle_down', [0, 1], frameRate, true)
      instance.animations.play('idle_down')
      instance.setAction(() => this.game.actions.setCurrentDialogue(dialogue))
      instance.addOnInputDown(onNPCInputDown)
      this.game.add.existing(instance)
    })
  }

  update () {
    this.marker.x = this.map.getTileX(this.input.activePointer.worldX) * this.TILE_SIZE
    this.marker.y = this.map.getTileY(this.input.activePointer.worldY) * this.TILE_SIZE
  }
}

export default GameState
