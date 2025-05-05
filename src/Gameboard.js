import { Ship } from './Ship.js'

export class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null))
    this.ships = new Set()
  }

  #checkValidity(shipLength, x, y, direction) {
    if (direction === 'horizontal') {
      for (let i = y; i < y + shipLength; i++) {
        if (i >= 10) throw new Error('ship goes beyond the board')
        if (this.board[x][i] instanceof Ship)
          throw new Error('ship is superimposed on another')
        if (this.board[x][i] === '.')
          throw new Error('ship too close to another')
      }
    } else if (direction === 'vertical') {
      for (let i = x; i < x + shipLength; i++) {
        if (i >= 10) throw new Error('ship goes beyond the board')
        if (this.board[i][y] instanceof Ship)
          throw new Error('ship is superimposed on another')
        if (this.board[i][y] === '.')
          throw new Error('ship too close to another')
      }
    }
    return true
  }

  #markAround(coords) {
    for (const [x, y] of coords) {
      for (let dx = x - 1; dx <= x + 1; dx++) {
        if (dx < 0 || dx > 9) continue
        for (let dy = y - 1; dy <= y + 1; dy++) {
          if (dy < 0 || dy > 9) continue
          if (this.board[dx][dy] === null) {
            this.board[dx][dy] = '.'
          }
        }
      }
    }
  }

  placeShip(ship, x, y, direction) {
    const shipLength = ship.length
    this.#checkValidity(shipLength, x, y, direction)

    const coords = []
    if (direction === 'horizontal') {
      for (let i = y; i < y + shipLength; i++) {
        this.board[x][i] = ship
        coords.push([x, i])
        this.ships.add(ship)
      }
    } else if (direction === 'vertical') {
      for (let i = x; i < x + shipLength; i++) {
        this.board[i][y] = ship
        coords.push([i, y])
        this.ships.add(ship)
      }
    }
    this.#markAround(coords)
  }

  finalizeBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j] === '.') this.board[i][j] = null
        else if (this.board[i][j] instanceof Ship)
          this.board[i][j] = { ship: this.board[i][j], isHit: false }
      }
    }
  }

  recieveAttack(x, y) {
    if (this.board[x][y] === null) {
      this.board[x][y] = '.'
      return false
    }

    if (typeof this.board[x][y] === 'object') {
      if (!this.board[x][y].isHit) {
        this.board[x][y].isHit = true
        this.board[x][y].ship.hit()
        return true
      }
    }

    throw new Error('This cell already attacked')
  }

  allShipsSunk() {
    return [...this.ships].every((item) => item.isSunk())
  }
}
