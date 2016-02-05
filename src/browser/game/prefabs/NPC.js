class NPC extends Phaser.Sprite {
  constructor (game, x, y, key, frame) {
    super(game, x, y, key, frame)

    this.anchor.setTo(0.25)
    this.inputEnabled = true
    this.input.priorityID = 2

    this._action = null
  }

  addOnInputDown (onInputDown) {
    if (typeof onInputDown === 'function') {
      // TODO: how to remove listener?
      this.events.onInputDown.add(onInputDown)
    }
  }

  setName (name) {
    const text = this.game.add.text(0, 0, name, {
      font: '2px',
      fill: '#ffff00'
    })
    text.anchor.set(0.5)
    text.x = Math.floor(this.x + this.width / 2)
    text.y = this.y - 10
  }

  setAction (action) {
    this._action = action
  }

  triggerAction () {
    if (typeof this._action === 'function') {
      this._action()
    }
  }
}

export default NPC
