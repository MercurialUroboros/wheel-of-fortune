import { observe } from '@nx-js/observer-util';
import { Graphics, Sprite, Texture, Container, Application, Assets, Text } from 'pixi.js';
import { store } from '../store';
import { GAME_VIEWPORT, } from '../utils';
import background from '../assets/background.png'
import wheelSlice from '../assets/wheel-slice.png'
import wheelCenter from '../assets/wheel-center.png'
import gsap from 'gsap';
import { Wheel } from './Wheel';

/**
 * The entry point for the app
 * Will include the slot, the bonus game and the top/bottom black bars
 */
class App extends Application {
  private readonly viewPortRatio = GAME_VIEWPORT[0] / GAME_VIEWPORT[1]
  private readonly app = new Container()
  private isStarted = false

  constructor () {
    super({
      sharedTicker: true,
      antialias: true,
      autoStart: false,
      backgroundAlpha: 0,
      autoDensity: true,
      resolution: devicePixelRatio,
      width: GAME_VIEWPORT[0],
      height: GAME_VIEWPORT[1],
    })

    this.stage.addChild(this.app)
    this.applyResize()
    window.addEventListener('resize', () => {
      this.applyResize()
    })
  }

  private applyResize () {
    const width = window.innerWidth
    const height = window.innerHeight
    let w = width
    let h = width / this.viewPortRatio

    if (width / height >= this.viewPortRatio) {
      w = height * this.viewPortRatio;
      h = height;
    }
    this.renderer.view.style!.width = w + 'px';
    this.renderer.view.style!.height = h + 'px';
  }

  public startApp () {
    if (this.isStarted) return
    this.isStarted = true
    document.body.appendChild(this.view);
    this.preload()
  }

  /**
   * Add textures manually
   * Avoided using spritesheet for the sake of simplicity
   */
  private async preload () {
    Assets.add('background', background)
    Assets.add('wheelSlice', wheelSlice)
    Assets.add('wheelCenter', wheelCenter)
    const assetsToLoad = Assets.load(['background', 'wheelSlice', 'wheelCenter'])
    await assetsToLoad
    this.init()

  }

  private init () {
    const wheel = new Wheel()
    this.app.addChild(wheel)
  }

}

/**
 * Export as a singleton
 */
export const appInstance = new App()