import { getSpinValue, getWeights } from '@/api'
import { Weight } from '@/types'

/**
 * Storing data in a flux pattern
 */
class Store {
  #weights: Weight<number>[] = []
  #credits = 2000
  #canSpin = false

  public get credits () {
    return this.#credits
  }

  public get weights () {
    return this.#weights
  }

  public get canSpin () {
    return this.#canSpin
  }

  private async loadWeights () {
    this.#weights = await getWeights()
  }

  public async purchaseSpin () {
    return (await getSpinValue())
  }

  public addToCredits (value: number) {
    this.#credits += value
  }

  public async connectBackendAPI () {
    await this.loadWeights()
  }

  public setCanSpin (canSpin: boolean) {
    this.#canSpin = canSpin
  }

}

/**
 * Singleton
 */
export const store = new Store()