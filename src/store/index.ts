import { observable } from '@nx-js/observer-util'

/**
 * Storing data in a flux pattern
 */
class Store {
  private readonly baseStake = 1
  private _balance = observable({ value: 2000 })
  private _stake = observable({ value: this.baseStake })
  private _shouldShowBonus = observable({ value: false })

  public get shouldShowBonus () {
    return this._shouldShowBonus;
  }

  public get balance () {
    return this._balance;
  }

  public get stake () {
    return this._stake;
  }

  public purchaseSpin (): boolean {
    if (this._balance.value < this._stake.value) return false
    this._balance.value -= this._stake.value
    return true
  }

  public addToBalance (value: number): void {
    this._balance.value += value
  }

  public updateStake (stake: number): void {
    this._stake.value = stake
  }

  public setShouldShowBonus (shouldShow: boolean) {
    this._shouldShowBonus.value = shouldShow
  }

  public startBonus () {
    this.setShouldShowBonus(true)
  }

  public stopBonus () {
    this.setShouldShowBonus(false)
  }
}

/**
 * Singleton
 */
export const store = new Store()