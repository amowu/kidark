class NPC extends Phaser.Sprite {
  constructor (game, x, y, key, frame) {
    super(game, x, y, key, frame)

    this.anchor.setTo(0.25)
    this.animations.add('idle_down', [0, 1], 8, true)
    this.animations.play('idle_down')
    this.inputEnabled = true
    this.input.priorityID = 2
  }

  addOnInputDown (onInputDown) {
    if (typeof onInputDown === 'function') {
      // TODO: how to remove listener?
      this.events.onInputDown.add(onInputDown)
    }
  }

  triggerAction () {
    // TODO: this.game.actions[setCurrentDialogue, dialoagueId]
    this.game.actions.setCurrentDialogue('10001')
  }
}

export default NPC
