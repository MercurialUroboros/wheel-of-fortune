import { Assets, Sprite } from 'pixi.js';

export abstract class BaseButton extends Sprite {

  constructor () {
    super()
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

  protected deactivate () {
    this.alpha = 0.7
  }

  protected activate () {
    this.alpha = 1
  }
}