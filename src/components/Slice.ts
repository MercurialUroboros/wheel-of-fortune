import { Assets, Sprite, Text } from 'pixi.js';

export class Slice extends Sprite {
  constructor (tint: number, label: string) {
    super(Assets.get('wheelSlice'))
    this.tint = tint
    this.anchor.set(0.5)
    const text = new Text(label, { fill: '#000000' });
    this.addChild(text)
    text.anchor.set(0.5)
  }
}