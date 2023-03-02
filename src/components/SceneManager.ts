import { emitter } from '@/emitter';
import { store } from '@/store';
import { maxGameWidth, maxGameHeight } from '@/utils';
import gsap from 'gsap';
import { Container } from 'pixi.js';
import { Background } from './Background';
import { Footer } from './Footer';
import { GameScene } from './GameScene';
import { TitleScene } from './TitleScene';

export class SceneManager extends Container {
  private titleScene = new TitleScene()
  private gameScene = new GameScene()
  private footer = new Footer()

  private readonly sceneTween = gsap.timeline({ paused: true })
    .to(this.titleScene, {
      alpha: 0,
      onReverseComplete: () => {
        this.hideScene(this.gameScene)
        this.showScene(this.titleScene)
      },
      onComplete: () => {
        this.hideScene(this.titleScene)
      }
    })
    .to(this.gameScene, {
      alpha: 1,
      onReverseComplete: () => {
        this.titleScene.visible = true
      },
      onStart: () => {
        this.gameScene.visible = true
      },
    })

  constructor () {
    super()
    this.setup()
  }

  private setup () {
    this.hideScene(this.gameScene, true)
    this.setupBackground()
    this.setupFooter()
    this.hookEventListeners()
    this.hookReactivity()
    this.addChild(this.titleScene, this.gameScene)
  }

  private setupBackground () {
    const background = new Background(maxGameWidth, maxGameHeight)
    this.addChild(background)
  }

  private setupFooter () {
    this.footer.position.y = maxGameHeight - this.footer.height
    this.footer.setupCredits(store.credits)
    this.addChild(this.footer)
  }

  private hideScene (scene: Container, withAlpha = false) {
    scene.visible = false
    if (withAlpha) {
      scene.alpha = 0
    }
  }

  private showScene (scene: Container) {
    scene.visible = true
  }

  private hookEventListeners () {
    emitter.on('transition_to_game_scene', () => {
      store.setCanSpin(true)
      this.sceneTween.play()
    })
    emitter.on('transition_to_title_scene', () => {
      store.setCanSpin(false)
      this.sceneTween.reverse()
    })
  }

  private hookReactivity () {
    emitter.on('spin_ended', (creditsWon: number) => {
      store.setCanSpin(false)
      store.addToCredits(creditsWon)
      this.footer.updateCredits(store.credits)
    })
  }


}