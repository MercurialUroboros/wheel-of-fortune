import { observable } from '@nx-js/observer-util'
import { getSpinValue, getWeights } from '@/api'
import { Weight } from '@/types'

/**
 * Storing data in a flux pattern
 */
class Store {
  private readonly baseStake = 1
  #weights: Weight<number>[] = []
  #balance = observable({ value: 2000 })
  #stake = observable({ value: this.baseStake })
  #shouldShowBonus = observable({ value: false })

  public get shouldShowBonus () {
    return this.#shouldShowBonus;
  }

  public get balance () {
    return this.#balance;
  }

  public get stake () {
    return this.#stake;
  }

  public get weights () {
    return this.#weights;
  }

  private async loadWeights () {
    this.#weights = await getWeights()
  }

  public async purchaseSpin () {
    if (this.#balance.value < this.#stake.value) return false
    this.#balance.value -= this.#stake.value
    const data = await getSpinValue()
    return data
  }

  public addToBalance (value: number): void {
    this.#balance.value += value
  }

  public updateStake (stake: number): void {
    this.#stake.value = stake
  }

  public setShouldShowBonus (shouldShow: boolean) {
    this.#shouldShowBonus.value = shouldShow
  }

  public async connectBackendAPI () {
    await this.loadWeights()
  }

}

/**
 * Singleton
 */
export const store = new Store()