import { Assets, Sprite } from 'pixi.js'

export class Background extends Sprite {
  constructor (width: number, height: number) {
    super(Assets.get('background'))
    this.width = width
    this.height = height
  }
}