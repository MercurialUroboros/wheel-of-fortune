import { maxGameWidth } from '@/utils';
import { sound } from '@pixi/sound';
import { Container, Sprite, Text, Texture } from 'pixi.js';
import gsap, { Linear } from 'gsap';

export class Footer extends Container {
  private creditsLabel = new Text("Credits: ", { fill: 0xffffff })
  private creditsValueLabel = new Text("100", { fill: 0xffffff })
  private currentCredits = 0
  #height = 80

  constructor () {
    super()
    this.setupBackground()
    this.setupLabels()
  }

  private setupBackground () {
    const background = new Sprite(Texture.WHITE)
    background.tint = 0x000000
    background.width = maxGameWidth
    background.height = this.#height
    this.addChild(background)
  }

  private setupLabels () {
    this.creditsLabel.anchor.set(0, .5)
    this.creditsValueLabel.anchor.set(0, .5)

    this.creditsLabel.y = this.#height / 2
    this.creditsValueLabel.y = this.creditsLabel.y
    this.creditsValueLabel.x = this.creditsLabel.getBounds().right
    this.addChild(this.creditsLabel, this.creditsValueLabel)
  }

  public setupCredits (value: number) {
    this.currentCredits = value
    this.creditsValueLabel.text = this.currentCredits
  }

  public async updateCredits (value: number) {
    const temp = { value: this.currentCredits }
    await gsap.to(temp, {
      value,
      ease: Linear.easeNone,
      onUpdate: () => {
        sound.play('creditsRollUpSound')
        this.creditsValueLabel.text = temp.value.toFixed(0)
      }
    });

    this.setupCredits(value)
  }
}