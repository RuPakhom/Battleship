import { Player } from './Player.js'
import { Gameboard } from './Gameboard.js'
import { Cell } from './Cell.js'
import { UI } from './UI.js'
import { Ship } from './Ship.js'

const player1 = new Player(Player.PLAYER_TYPES.HUMAN, new Gameboard())
const player2 = new Player(Player.PLAYER_TYPES.HUMAN, new Gameboard())
const PLAYERS = [player1, player2]
const ui = UI()

export function Game() {
  player2.gameboard.placeShip(new Ship(4), 1, 1, 'horizontal')
  player2.gameboard.placeShip(new Ship(3), 3, 1, 'vertical')
  player2.gameboard.placeShip(new Ship(2), 4, 3, 'horizontal')
  player2.gameboard.placeShip(new Ship(1), 7, 6, 'horizontal')
  player2.gameboard.finalizeBoard()
  player2.gameboard.recieveAttack(0, 0)
  player2.gameboard.recieveAttack(1, 1)

  ui.renderPlayerBoard(player1)
  ui.renderOpponentBoard(player2)
}

export function handleAttack(x, y) {
  player2.gameboard.recieveAttack(x, y)
  ui.renderOpponentBoard(player2)
}
