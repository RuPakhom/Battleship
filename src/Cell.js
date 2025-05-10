export class Cell {
  static STATES = {
    EMPTY: 'empty',
    BLOCKED: 'blocked',
    SHIP: 'ship',
    MISS: 'miss',
    HIT: 'hit',
    SUNK: 'sunk',
  }
  constructor() {
    this.state = Cell.STATES.EMPTY
    this.ship = null
  }

  markEmpty() {
    this.state = Cell.STATES.EMPTY
    this.ship = null
  }

  placeShip(ship) {
    this.state = Cell.STATES.SHIP
    this.ship = ship
  }

  markBlocked() {
    if (this.ship !== null) throw new Error("Cell can't be blocked")
    this.state = Cell.STATES.BLOCKED
  }

  markMiss() {
    if (this.state === Cell.STATES.MISS)
      throw new Error('Cell already marked as miss')
    if (this.state === Cell.STATES.SHIP) throw new Error('Cell contains ship')
    this.state = Cell.STATES.MISS
  }

  markSunk() {
    this.state = Cell.STATES.SUNK
  }

  hitShip() {
    if (this.ship === null) throw new Error("Cell don't have a ship")
    if (this.state === Cell.STATES.HIT)
      throw new Error("Ship can't be hit twice")
    this.state = Cell.STATES.HIT
    this.ship.hit()
  }

  isEmpty() {
    return this.state === Cell.STATES.EMPTY
  }

  isBlocked() {
    return this.state === Cell.STATES.BLOCKED
  }

  isShip() {
    return this.state === Cell.STATES.SHIP
  }

  isMiss() {
    return this.state === Cell.STATES.MISS
  }

  isHit() {
    return this.state === Cell.STATES.HIT
  }

  isSunk() {
    return this.state === Cell.STATES.SUNK
  }
}
