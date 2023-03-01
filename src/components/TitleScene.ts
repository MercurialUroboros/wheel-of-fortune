import { emitter } from '@/emitter';
import { screenCenterX, screenCenterY } from '@/utils';
import { Container, Text } from 'pixi.js';
import { PlayButton } from './PlayButton';

export class TitleScene extends Container {

  constructor () {
    super()

    const text = new Text('Wheel of fortune!', { fill: 0xffffff, fontSize: 42 })
    text.anchor.set(0.5)
    text.position.set(screenCenterX, screenCenterY - 200)

    const playButton = new PlayButton()
    playButton.anchor.set(0.5, 0)
    playButton.y = text.getBounds().bottom + 20
    playButton.x = text.x

    playButton.on('pointerdown', () => {
      emitter.emit('transition_to_game_scene')
    })

    this.addChild(text, playButton)
  }
}