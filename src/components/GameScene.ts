import { Wheel } from '@/components/Wheel';
import { emitter } from '@/emitter';
import { store } from '@/store';
import { screenCenterX, screenCenterY } from '@/utils';
import { Container, Graphics, Text } from 'pixi.js';
import { SpinButton } from './SpinButton';
import { WinningScreen } from './WinningScreen';

export class GameScene extends Container {
  private wheel = new Wheel()
  private spinButton = new SpinButton()
  private winningScreen = new WinningScreen()

  constructor () {
    super()
    this.setupWheel()
    this.setupSpinButton()
    this.setupDebugButtons()
    this.setupWinningScreen()
    this.hookEmitters()
  }

  private setupWheel () {
    this.wheel.position.set(screenCenterX, screenCenterY)
    this.addChild(this.wheel)
  }

  private setupSpinButton () {
    this.spinButton.anchor.set(.5)
    this.spinButton.position.set(this.wheel.x, this.wheel.y)

    this.spinButton.addEventListener('pointerdown', async () => {
      if (!store.canSpin) return
      const data = await store.purchaseSpin()
      if (data) {
        await this.wheel.spinToSector(data)
      }
    })

    this.addChild(this.spinButton)
  }

  private setupDebugButtons () {
    const debugContainer = new Container()
    const debugButtons = new Container()
    const debugLabel = new Text('Debug Options', { fill: 0xffffff })
    debugContainer.addChild(debugLabel, debugButtons)
    debugButtons.x = debugLabel.getBounds().right + 10
    debugLabel.y = 5
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
        if (!store.canSpin) return
        await this.wheel.spinToSector({ index: i, weight: store.weights[i].weight, value: store.weights[i].value })
      })
      buttonGraphics.addChild(text)
      debugButtons.addChild(buttonGraphics)
    }

    this.addChild(debugContainer)
  }

  private setupWinningScreen () {
    this.addChild(this.winningScreen)
  }

  private hookEmitters () {
    emitter.on('spin_started', () => {
      this.spinButton.setPause()
    })

    emitter.on('spin_ended', (creditsWon: number) => {
      this.spinButton.setSpin()
      this.winningScreen.showWinningValue(creditsWon)
    })
  }

}