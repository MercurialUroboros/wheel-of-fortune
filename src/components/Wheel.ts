import { Container } from 'pixi.js'
import gsap, { Back } from 'gsap'
import { Slice } from './Slice'
import { store } from '@/store'
import { emitter } from '@/emitter'

export class Wheel extends Container {

  private readonly radius = 250
  private readonly numberOfSectors = 8
  private readonly piTwo = Number((Math.PI * 2).toFixed(2))
  private readonly radiansPerSector = this.piTwo / this.numberOfSectors;
  private readonly sliceColors = [0xff6961, 0xffb480, 0xf8f38d, 0x42d6a4, 0x08cad1, 0x59adf6, 0x9d94ff, 0xc780e8]

  private get weights () {
    return store.weights
  }

  constructor () {
    super()
    this.buildWheel()
    let i = 0
  }

  private async buildWheel () {
    for (let sector = 0; sector < this.numberOfSectors; sector++) {
      const slice = new Slice(this.sliceColors[sector], `${sector} - ${this.weights[sector].value}`)

      const rotation = (sector * this.radiansPerSector) + (Math.PI * 3 / 2)
      const textAnchorPercentage = (this.radius - 40 / 2) / this.radius;

      slice.rotation = rotation + Math.PI;

      slice.position.x = this.radius
        + this.radius * textAnchorPercentage * Math.cos(rotation);
      slice.position.y = this.radius
        + this.radius * textAnchorPercentage * Math.sin(rotation);

      this.addChild(slice)
    }

    this.pivot.set(this.radius)
  }

  public async spinToSector (sectorNumber: number) {
    this.rotation = 0
    const rotationValue = (this.radiansPerSector * sectorNumber) + this.piTwo
    emitter.emit('spin-started')
    await gsap.to(this, {
      rotation: `${-rotationValue}`,
      ease: Back.easeOut.config(1),
      duration: 2
    })
    emitter.emit("spin-ended")
  }




}