import { Assets, Container, Sprite } from 'pixi.js'
import gsap, { Back } from 'gsap'
import { Slice } from './Slice'
import { store } from '@/store'
import { emitter } from '@/emitter'
import { sound } from '@pixi/sound'

export class Wheel extends Container {

  private readonly radius = 250
  private readonly numberOfSectors = 8
  private readonly piTwo = Number((Math.PI * 2).toFixed(2))
  private readonly radiansPerSector = this.piTwo / this.numberOfSectors;
  private readonly sliceColors = [0xff6961, 0xffb480, 0xf8f38d, 0x42d6a4, 0x08cad1, 0x59adf6, 0x9d94ff, 0xc780e8]
  private isSpinning = false
  private wheelContainer = new Container()

  private get weights () {
    return store.weights
  }

  constructor () {
    super()
    this.buildWheel()
    this.addPointer()
  }

  private async buildWheel () {
    for (let sector = 0; sector < this.numberOfSectors; sector++) {
      const slice = new Slice(this.sliceColors[sector], `${sector} - ${this.weights[sector].value}`)

      const rotation = (sector * this.radiansPerSector) + (Math.PI * 3 / 2)
      const textAnchorPercentage = (this.radius - 40 / 2) / this.radius

      slice.rotation = rotation + Math.PI

      slice.position.x = this.radius
        + this.radius * textAnchorPercentage * Math.cos(rotation)
      slice.position.y = this.radius
        + this.radius * textAnchorPercentage * Math.sin(rotation)

      this.wheelContainer.addChild(slice)
    }

    this.addChild(this.wheelContainer)
    this.wheelContainer.pivot.set(this.radius)
  }

  private addPointer () {
    const sprite = new Sprite(Assets.get('wheelPointer'))
    sprite.anchor.set(0.5)
    sprite.position.set(0, (-this.radius * 2) + 50)
    this.addChild(sprite)
  }

  public async spinToSector ({ index, value }: { index: number, value: number }) {
    if (this.isSpinning) return
    this.wheelContainer.rotation = 0
    const rotationValue = (this.radiansPerSector * index) + this.piTwo
    emitter.emit('spin_started')
    this.isSpinning = true
    let previousSegment = 0
    await gsap.to(this.wheelContainer, {
      onUpdate: () => {
        if (previousSegment !== Math.floor(this.wheelContainer.rotation)) {
          sound.play('wheelClickSound')
          previousSegment = Math.floor(this.wheelContainer.rotation)
        }
      },
      rotation: `${-rotationValue}`,
      ease: Back.easeOut.config(1),
      duration: 2
    })
    sound.play('wheelLandingSound')
    emitter.emit('spin_ended', value)
    this.isSpinning = false
  }
}