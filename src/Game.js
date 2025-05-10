import { Player } from './Player.js'
import { Gameboard } from './Gameboard.js'
import { Cell } from './Cell.js'
import { UI } from './UI.js'
import { Ship } from './Ship.js'

export function Game() {
  const player1 = new Player(
    'Player1',
    Player.PLAYER_TYPES.HUMAN,
    new Gameboard()
  )
  const player2 = new Player('AI', Player.PLAYER_TYPES.AI, new Gameboard())

  const ui = UI()
  let currentPlayer = player1
  let opponent = player2

  function startGame() {
    ui.renderPlayerBoard(currentPlayer)
    ui.generateDock()
    ui.generateControls()
    ui.onPlaceShip(placeShip)
    ui.onRandomClick(randomShipArrangement, currentPlayer)
    ui.onNextClick((playerName, opponentType) => {
      player1.name = playerName
      player1.gameboard.finalizeBoard()
      ui.removeDock()
      ui.removeControls()

      if (opponentType === 'ai') {
        randomShipArrangement(player2)
        player2.gameboard.finalizeBoard()
        currentPlayer = player1
        opponent = player2
        ui.renderPlayerBoard(player1)
        ui.renderOpponentBoard(player2)
        ui.onOpponentClick(handleAttack)
        ui.enableBoard()
      } else {
        player2.name = 'Player 2'
        player2.type = Player.PLAYER_TYPES.HUMAN
        currentPlayer = player2
        opponent = player1
        ui.generateDock()
        ui.generateControls()
        ui.removeSelect()
        ui.renderPlayerBoard(player2)
        ui.onPlaceShip(placeShip)
        ui.onRandomClick(randomShipArrangement, currentPlayer)

        ui.onNextClick(() => {
          const remaining = document.querySelectorAll('.dock .ship').length
          if (remaining > 0) {
            console.log('Place all ships before continuing!')
            return
          }
          player2.gameboard.finalizeBoard()
          ui.removeDock()
          ui.removeControls()
          currentPlayer = player1
          opponent = player2
          ui.renderPlayerBoard(player1)
          ui.renderOpponentBoard(player2)
          ui.onOpponentClick(handleAttack)
          ui.enableBoard()
        })
      }
    })
  }

  function placeShip(size, x, y, direction) {
    const ship = new Ship(size)
    currentPlayer.gameboard.placeShip(ship, x, y, direction)
    ui.renderPlayerBoard(currentPlayer)
  }

  function handleAttack(x, y) {
    ui.disableBoard()
    const hit = opponent.gameboard.recieveAttack(x, y)

    if (currentPlayer.type === Player.PLAYER_TYPES.AI) {
      ui.renderPlayerBoard(player1)
    } else if (currentPlayer.type === Player.PLAYER_TYPES.HUMAN) {
      ui.renderOpponentBoard(opponent)
    }

    if (opponent.gameboard.allShipsSunk()) {
      ui.showWinMessage(`${currentPlayer.name} wins`)
      ui.disableBoard()
      return
    }

    if (!hit) {
      setTimeout(() => {
        switchTurn()
      }, 800)
    } else {
      if (currentPlayer.type === Player.PLAYER_TYPES.AI) {
        setTimeout(AIAttack, 800)
      } else if (currentPlayer.type === Player.PLAYER_TYPES.HUMAN) {
        ui.enableBoard()
      }
    }
  }

  function AIAttack() {
    ui.disableBoard()
    let x, y

    do {
      x = Math.floor(Math.random() * 10)
      y = Math.floor(Math.random() * 10)
    } while (
      player1.gameboard.board[x][y].isMiss() ||
      player1.gameboard.board[x][y].isHit() ||
      player1.gameboard.board[x][y].isSunk()
    )

    currentPlayer = player2
    opponent = player1

    handleAttack(x, y)
  }

  function randomShipArrangement(player) {
    const ships = [
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
      new Ship(2),
      new Ship(2),
      new Ship(1),
      new Ship(1),
      new Ship(1),
      new Ship(1),
    ]
    player.gameboard = new Gameboard()

    ships.forEach((ship) => {
      let x, y, direction
      while (true) {
        x = Math.floor(Math.random() * 10)
        y = Math.floor(Math.random() * 10)
        direction = Math.random() > 0.5 ? 'horizontal' : 'vertical'
        try {
          player.gameboard.placeShip(ship, x, y, direction)
          break
        } catch (err) {
          console.log(err)
        }
      }
    })

    ui.renderPlayerBoard(player)
  }

  function switchTurn() {
    ;[currentPlayer, opponent] = [opponent, currentPlayer]
    if (currentPlayer.type === Player.PLAYER_TYPES.AI) {
      AIAttack()
    } else if (currentPlayer.type === Player.PLAYER_TYPES.HUMAN) {
      ui.renderPlayerBoard(currentPlayer)
      ui.renderOpponentBoard(opponent)
      ui.enableBoard()
    }
  }

  return { startGame }
}
