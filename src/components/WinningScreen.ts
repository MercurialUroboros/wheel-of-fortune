import { emitter } from '@/emitter'
import { maxGameHeight, maxGameWidth, screenCenterX, screenCenterY } from '@/utils'
import gsap from 'gsap'
import { Container, Sprite, Text, Texture } from 'pixi.js'

export class WinningScreen extends Container {
  private label = new Text('', { fill: 0xffffff, fontSize: 50 })
  private background = new Sprite(Texture.WHITE)
  private tween = gsap.to(this.background, { alpha: .7, paused: true, duration: 1 })

  constructor () {
    super()
    this.background.tint = 0x000000
    this.background.width = maxGameWidth
    this.background.height = maxGameHeight
    this.background.alpha = 0
    this.background.interactive = true
    this.label.anchor.set(0.5)
    this.label.position.set(screenCenterX, screenCenterY)
    this.addChild(this.background, this.label)
    this.hide()
  }

  public async showWinningValue (value: number) {
    this.visible = true
    this.label.text = `You won ${value} credits`
    await this.tween.play()
    await this.hide(true)
  }

  public async hide (withEmit = false) {
    await this.tween.reverse()
    this.visible = false
    if (withEmit) {
      emitter.emit('transition_to_title_scene')
    }
  }
}