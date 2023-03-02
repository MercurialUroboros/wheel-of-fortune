import { Assets, Text } from 'pixi.js'
import { BaseButton } from './BaseButton'

export class SpinButton extends BaseButton {
  private pauseState = false
  private label = new Text('', { fill: 0x000000 })

  constructor () {
    super()
    this.setup()
  }

  private setup () {
    this.pauseState = false
    this.interactive = !this.pauseState
    this.texture = Assets.get("wheelCenter")
    this.label.anchor.set(0.5)
    this.addChild(this.label)
    this.setSpin()
    this.activate()
  }

  public setSpin () {
    this.label.text = 'Press to spin'
  }

  public setPause () {
    this.label.text = 'Wait'
  }

  protected deactivate () {
    this.alpha = 1
  }

  protected activate () {
    this.alpha = 1
  }

}