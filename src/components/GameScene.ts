import { Background } from '@/components/Background';
import { SpinButton } from '@/components/SpinButton';
import { Wheel } from '@/components/Wheel';
import { emitter } from '@/emitter';
import { store } from '@/store';
import { maxGameHeight, maxGameWidth, screenCenterX, screenCenterY } from '@/utils';
import { Container, Graphics, Text } from 'pixi.js';

export class GameScene extends Container {
  private wheel = new Wheel()
  private spinButton = new SpinButton()

  constructor () {
    super()
    this.setupBackground()
    this.setupWheel()
    this.setupSpinButton()
    this.setupDebugButtons()
    this.hookEmitters()
  }

  private setupBackground () {
    const background = new Background(maxGameWidth, maxGameHeight)
    this.addChild(background)
  }

  private setupWheel () {
    this.wheel.position.set(screenCenterX, screenCenterY)
    this.addChild(this.wheel)
  }

  private setupSpinButton () {
    this.spinButton.anchor.set(1)
    this.spinButton.position.set(maxGameWidth, maxGameHeight)

    this.spinButton.addEventListener('pointerdown', async () => {
      const data = await store.purchaseSpin()
      if (data) {
        const { index, value, weight } = data
        this.wheel.spinToSector(index)
        console.log('click', index, value, weight)
      }
    })

    this.addChild(this.spinButton)
  }

  private setupDebugButtons () {
    for (let i = 0; i < store.weights.length; i++) {
      const text = new Text(`(${i}) ${store.weights[i].value}`, { fill: 0xffffff })
      const buttonGraphics = new Graphics()
        .beginFill(0x000000)
        .lineStyle(2, 0xFEEB77, 1)
        .drawRect(0, 0, 150, 50)
        .endFill()
      buttonGraphics.x = buttonGraphics.width * i
      buttonGraphics.cursor = 'pointer'
      text.anchor.set(0.5)
      text.x = buttonGraphics.width / 2
      text.y = buttonGraphics.height / 2
      buttonGraphics.interactive = true
      buttonGraphics.addEventListener('pointerdown', async () => {
        await this.wheel.spinToSector(i)
      })
      buttonGraphics.addChild(text)
      this.addChild(buttonGraphics)
    }
  }

  private hookEmitters () {
    emitter.on('spin-started', () => {
      this.spinButton.setPause()
    })

    emitter.on('spin-ended', () => {
      this.spinButton.setSpin()
    })
  }

}