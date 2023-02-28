import * as PIXI from 'pixi.js'
import { appInstance } from './components/App'
import './styles/style.scss'
import 'normalize.css'

/**
 * This portion is to hook pixi-dev tools chrome extension on your browser
 */
if (import.meta.env.DEV) {
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__?.register({ PIXI })
}

appInstance.startApp()