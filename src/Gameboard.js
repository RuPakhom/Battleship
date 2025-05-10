import { Cell } from './Cell.js'

export class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => new Cell())
    )
    this.ships = new Set()
  }

  #checkValidity(shipLength, x, y, direction) {
    if (direction === 'horizontal') {
      for (let i = y; i < y + shipLength; i++) {
        if (i >= 10) throw new Error('ship goes beyond the board')
        if (this.board[x][i].isShip())
          throw new Error('ship is superimposed on another')
        if (this.board[x][i].isBlocked())
          throw new Error('ship too close to another')
      }
    } else if (direction === 'vertical') {
      for (let i = x; i < x + shipLength; i++) {
        if (i >= 10) throw new Error('ship goes beyond the board')
        if (this.board[i][y].isShip())
          throw new Error('ship is superimposed on another')
        if (this.board[i][y].isBlocked())
          throw new Error('ship too close to another')
      }
    }
  }

  #markAround(coords) {
    for (const [x, y] of coords) {
      for (let dx = x - 1; dx <= x + 1; dx++) {
        if (dx < 0 || dx > 9) continue
        for (let dy = y - 1; dy <= y + 1; dy++) {
          if (dy < 0 || dy > 9) continue
          if (this.board[dx][dy].isEmpty()) {
            this.board[dx][dy].markBlocked()
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
        this.board[x][i].placeShip(ship)
        coords.push([x, i])
        this.ships.add(ship)
      }
    } else if (direction === 'vertical') {
      for (let i = x; i < x + shipLength; i++) {
        this.board[i][y].placeShip(ship)
        coords.push([i, y])
        this.ships.add(ship)
      }
    }
    this.#markAround(coords)
  }

  finalizeBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j].isBlocked()) this.board[i][j].markEmpty()
      }
    }
  }

  recieveAttack(x, y) {
    if (this.board[x][y].isEmpty()) {
      this.board[x][y].markMiss()
      return false
    }

    if (this.board[x][y].isShip()) {
      this.board[x][y].hitShip()
      const ship = this.board[x][y].ship

      if (this.board[x][y].ship.isSunk()) {
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
            if (this.board[i][j].ship === ship) this.board[i][j].markSunk()
          }
        }
      }
      return true
    }

    throw new Error('This cell already attacked')
  }

  allShipsSunk() {
    return [...this.ships].every((item) => item.isSunk())
  }

  allShipsPlaced() {
    return this.ships.size === 10
  }
}
