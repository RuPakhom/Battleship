import { Cell } from './Cell.js'
import { handleAttack } from './Game.js'

export function UI() {
  const gameboard = document.querySelector('.gameboard')

  const playerBoard = document.createElement('div')
  playerBoard.classList.add('player-board')
  gameboard.appendChild(playerBoard)

  const opponentBoard = document.createElement('div')
  opponentBoard.classList.add('player-board')
  gameboard.appendChild(opponentBoard)

  opponentBoard.addEventListener('click', (e) => {
    if (!e.target.classList.contains('cell')) return
    if (
      e.target.classList.contains('ship') ||
      e.target.classList.contains('empty')
    ) {
      handleAttack(+e.target.dataset.x, +e.target.dataset.y)
    }
  })

  function renderPlayerBoard(player) {
    const board = player.gameboard.board
    console.log(board)
    playerBoard.innerHTML = ''

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div')
        cell.dataset.x = i
        cell.dataset.y = j
        cell.classList.add('cell')
        if (board[i][j].isShip()) {
          cell.classList.add('ship')
        } else if (board[i][j].isEmpty() || board[i][j].isBlocked()) {
          cell.classList.add('empty')
        } else if (board[i][j].isHit()) {
          cell.textContent = 'X'
          cell.classList.add('hit')
        } else if (board[i][j].isMiss()) {
          cell.textContent = '·'
          cell.classList.add('miss')
        }
        playerBoard.appendChild(cell)
      }
    }
  }

  function renderOpponentBoard(player) {
    const board = player.gameboard.board
    opponentBoard.innerHTML = ''

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div')
        cell.dataset.x = i
        cell.dataset.y = j
        cell.classList.add('cell')
        if (
          board[i][j].isEmpty() ||
          board[i][j].isBlocked() ||
          board[i][j].isShip()
        ) {
          cell.classList.add('empty')
        } else if (board[i][j].isHit()) {
          cell.textContent = 'X'
          cell.classList.add('hit')
        } else if (board[i][j].isMiss()) {
          cell.textContent = '·'
          cell.classList.add('miss')
        }
        opponentBoard.appendChild(cell)
      }
    }
  }

  return { renderPlayerBoard, renderOpponentBoard }
}
