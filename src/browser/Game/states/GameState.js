import { get } from 'lodash'

import Map from '../prefabs/Map'
import Player from '../prefabs/Player'
import NPC from '../prefabs/NPC'

class GameState extends Phaser.State {
  init () {
    this.map = null
    this.layer = null
    this.player = null
    this.npc = null
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

    this.npc = new NPC(this.game, (9 * this.TILE_SIZE), (12 * this.TILE_SIZE), 'codeer')
    this.npc.addOnInputDown((npc) => {
      this.map.findPath(this.player, npc).then(path => {
        if (path) {
          path.pop()// remove NPC self position
          this.player.followPath(path, () => {
            this.npc.triggerAction()
          })
        }
      })
    })

    this.player = new Player(this.game, (12 * this.TILE_SIZE), (10 * this.TILE_SIZE), 'clotharmor')

    this.marker = this.add.graphics()
    this.marker.lineStyle(2, 0xff0000, 1)
    this.marker.drawRect(0, 0, this.TILE_SIZE, this.TILE_SIZE)

    this.game.add.existing(this.npc)
    this.game.add.existing(this.player)

    this.camera.follow(this.player)
  }

  update () {
    this.marker.x = this.map.getTileX(this.input.activePointer.worldX) * this.TILE_SIZE
    this.marker.y = this.map.getTileY(this.input.activePointer.worldY) * this.TILE_SIZE
  }
}

export default GameState
