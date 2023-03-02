import { Assets } from 'pixi.js'
import { BaseButton } from './BaseButton'

export class PlayButton extends BaseButton {
  private pauseState = false

  constructor () {
    super()
    this.setSpin()
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
    this.texture = Assets.get("playButton")
    this.activate()
  }

}