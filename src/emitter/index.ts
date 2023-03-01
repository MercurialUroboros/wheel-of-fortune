import { utils } from 'pixi.js'

enum GameEvents {
  SPIN_STARTED = 'spin_started',
  SPIN_ENDED = 'spin_ended',
  TRANSITION_TO_GAME_SCENE = 'transition_to_game_scene',
  TRANSITION_TO_TITLE_SCENE = 'transition_to_title_scene',
}

type GameEvent = `${GameEvents}`


export const emitter = new utils.EventEmitter<GameEvent>()
