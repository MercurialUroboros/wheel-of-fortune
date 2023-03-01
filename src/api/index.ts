import axios from 'axios'
import { Weight } from '@/types'
import { getRandomFromWeights } from '@/utils'
import { store } from '@/store'

export const http = axios.create({
  timeout: 60000,
})

export const getWeights = async () => {
  try {
    const weights = ((await http.get<Weight<number>[]>('/mock-data/weights.json')).data)
    return weights
  } catch {
    console.log('Failed to load weights')
    return []
  }
}

export const getSpinValue = async () => {
  try {
    return getRandomFromWeights(store.weights)
  } catch {
    console.log('Failed to load weights')
    return { ...store.weights[0], index: 0 }
  }
}