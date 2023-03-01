import { Container, Application, Assets } from 'pixi.js';
import { store } from '@/store';
import { GAME_VIEWPORT, } from '@/utils';
import { GameScene } from '@/components/GameScene';
import background from '@/assets/background.png'
import wheelSlice from '@/assets/wheel-slice.png'
import wheelCenter from '@/assets/wheel-center.png'
import spinButton from '@/assets/spin.png'
import pauseButton from '@/assets/pause.png'

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
    document.body.appendChild(this.view as unknown as Node);
    this.preload()
  }

  /**
   * Add textures manually
   * Avoided using spritesheet for the sake of simplicity
   */
  private async preload () {

    const assetList = [
      {
        label: 'background',
        path: background
      },
      {
        label: 'wheelSlice',
        path: wheelSlice
      },
      {
        label: 'wheelCenter',
        path: wheelCenter
      },
      {
        label: 'spinButton',
        path: spinButton
      },
      {
        label: 'pauseButton',
        path: pauseButton
      },
    ]

    assetList.forEach(({ label, path }) => {
      Assets.add(label, path)
    })

    const assetsToLoad = Assets.load(assetList.map(al => al.label))
    await assetsToLoad
    await store.connectBackendAPI()
    this.init()
  }

  private init () {
    const gameScene = new GameScene()
    this.app.addChild(gameScene)
  }

}

/**
 * Export as a singleton
 */
export const appInstance = new App()