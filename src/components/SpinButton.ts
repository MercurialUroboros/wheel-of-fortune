import { Assets, Sprite } from 'pixi.js';

export class SpinButton extends Sprite {
  private pauseState = false

  constructor () {
    super()
    this.setSpin()
    this.interactive = true
    this.cursor = 'pointer'
    this.deactivate()
    this.addListeners()
  }

  private addListeners () {
    this.addEventListener('pointerover', () => {
      this.activate()
    })

    this.addEventListener('pointerleave', () => {
      this.deactivate()
    })
  }

  private deactivate () {
    this.alpha = 0.7
  }

  private activate () {
    this.alpha = 1
  }

  public setPause () {
    this.pauseState = true
    this.interactive = !this.pauseState
    this.texture = Assets.get("pauseButton")
    this.deactivate()
  }

  public setSpin () {
    this.pauseState = false
    this.interactive = !this.pauseState
    this.texture = Assets.get("spinButton")
    this.activate()
  }

}