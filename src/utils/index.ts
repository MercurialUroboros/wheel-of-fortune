import { Weight } from '@/types'
export const GAME_VIEWPORT: [number, number] = [1920, 1080]

export const maxGameWidth = GAME_VIEWPORT[0]
export const maxGameHeight = GAME_VIEWPORT[1]

export const screenCenterX = maxGameWidth / 2
export const screenCenterY = maxGameHeight / 2


export const randChoice = <T> (arr: Array<T>): T => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const getRandomFromWeights = (weightedArray: Weight<number>[]) =>
  randChoice(weightedArray
    .map((wp, index) => Array.from({ length: wp.weight }, () => ({ index, value: wp.value, weight: wp.weight })))
    .flat())