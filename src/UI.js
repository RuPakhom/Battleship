import { Player } from './Player.js'

export function UI() {
  const gameboard = document.querySelector('.gameboard')

  const playerBoard = document.createElement('div')
  playerBoard.classList.add('player-board')
  gameboard.appendChild(playerBoard)

  const opponentBoard = document.createElement('div')
  opponentBoard.classList.add('player-board')
  gameboard.appendChild(opponentBoard)

  let dock = null
  let rotateBtn = null
  let ships = null
  let controls = null
  let nameInput = null
  let opponentSelect = null
  let nextBtn = null
  let randomBtn = null
  let draggedShip = null

  playerBoard.addEventListener('dragover', (e) => {
    e.preventDefault()
  })

  function _rotateHandler() {
    const ships = document.querySelectorAll('.ship')
    ships.forEach((ship) => ship.classList.toggle('vertical'))
    dock.classList.toggle('vertical')
  }

  function generateDock() {
    if (dock && dock.parentNode) {
      dock.remove()
    }
    draggedShip = null
    dock = document.createElement('div')
    dock.classList.add('dock')

    const fourships = document.createElement('div')
    fourships.classList.add('dock-section')
    fourships.classList.add('four')
    const ship4 = document.createElement('div')
    ship4.classList.add('ship')
    ship4.dataset.size = 4
    ship4.draggable = true
    fourships.appendChild(ship4)
    dock.appendChild(fourships)

    const threeships = document.createElement('div')
    threeships.classList.add('dock-section')
    threeships.classList.add('three')
    for (let i = 0; i < 2; i++) {
      const ship3 = document.createElement('div')
      ship3.classList.add('ship')
      ship3.dataset.size = 3
      ship3.draggable = true
      threeships.appendChild(ship3)
    }
    dock.appendChild(threeships)

    const twoships = document.createElement('div')
    twoships.classList.add('dock-section')
    twoships.classList.add('two')
    for (let i = 0; i < 3; i++) {
      const ship2 = document.createElement('div')
      ship2.classList.add('ship')
      ship2.dataset.size = 2
      ship2.draggable = true
      twoships.appendChild(ship2)
    }
    dock.appendChild(twoships)

    const oneships = document.createElement('div')
    oneships.classList.add('dock-section')
    oneships.classList.add('one')
    for (let i = 0; i < 4; i++) {
      const ship1 = document.createElement('div')
      ship1.classList.add('ship')
      ship1.dataset.size = 1
      ship1.draggable = true
      oneships.appendChild(ship1)
    }
    dock.appendChild(oneships)

    rotateBtn = document.createElement('button')
    rotateBtn.classList.add('rotate')
    rotateBtn.type = 'button'
    rotateBtn.textContent = 'Rotate ships'
    rotateBtn.addEventListener('click', _rotateHandler)
    dock.appendChild(rotateBtn)

    document.body.appendChild(dock)

    ships = document.querySelectorAll('.ship')

    dock.addEventListener('dragstart', (e) => {
      const ship = e.target.closest('.ship')
      if (!ship) return
      draggedShip = ship
      const obj = {
        size: ship.dataset.size,
        isVertical: ship.classList.contains('vertical'),
      }
      e.dataTransfer.setData('text/plain', JSON.stringify(obj))
      e.dataTransfer.effectAllowed = 'move'
    })
  }

  function removeDock() {
    if (dock) dock.remove()
    dock = null
  }

  function generateControls() {
    if (controls && controls.parentNode) {
      controls.remove()
    }
    controls = document.createElement('div')
    controls.classList.add('controls')

    const nameLabel = document.createElement('label')
    nameLabel.setAttribute('for', 'name')
    nameLabel.textContent = 'Enter your name: '

    nameInput = document.createElement('input')
    nameInput.id = 'name'
    nameInput.type = 'text'
    nameInput.value = 'Player1'

    nameLabel.appendChild(nameInput)
    controls.appendChild(nameLabel)

    const opponentLabel = document.createElement('label')
    opponentLabel.setAttribute('for', 'opponent')
    opponentLabel.textContent = 'Your opponent: '

    opponentSelect = document.createElement('select')
    opponentSelect.id = 'opponent'
    opponentSelect.name = 'opponent'

    const optionAI = document.createElement('option')
    optionAI.value = 'ai'
    optionAI.textContent = 'AI'

    const optionHuman = document.createElement('option')
    optionHuman.value = 'human'
    optionHuman.textContent = 'Human'

    opponentSelect.appendChild(optionAI)
    opponentSelect.appendChild(optionHuman)
    opponentLabel.appendChild(opponentSelect)
    controls.appendChild(opponentLabel)

    const buttonsDiv = document.createElement('div')
    buttonsDiv.classList.add('buttons')

    nextBtn = document.createElement('button')
    nextBtn.classList.add('next')
    nextBtn.type = 'button'
    nextBtn.textContent = 'Next player'

    randomBtn = document.createElement('button')
    randomBtn.classList.add('random')
    randomBtn.type = 'button'
    randomBtn.textContent = 'Generate Random'

    buttonsDiv.appendChild(nextBtn)
    buttonsDiv.appendChild(randomBtn)
    controls.appendChild(buttonsDiv)

    document.body.appendChild(controls)
  }

  function removeControls() {
    if (controls) controls.remove()
  }

  function removeSelect() {
    opponentSelect.parentElement.remove()
  }

  function onRandomClick(callback, currentPlayer) {
    randomBtn.addEventListener('click', () => {
      if (ships) ships = null
      removeDock()
      callback(currentPlayer)
    })
  }

  function onNextClick(callback) {
    nextBtn.addEventListener('click', () => {
      const nameValue = nameInput.value.trim() || 'Player'
      const opponentType = opponentSelect.value

      const remainingShips = document.querySelectorAll('.dock .ship').length
      if (remainingShips > 0) {
        console.log('Place all ships before continuing!')
        return
      }

      callback(nameValue, opponentType)
    })
  }

  function onPlaceShip(callback) {
    playerBoard.addEventListener('drop', (e) => {
      e.preventDefault()
      const data = e.dataTransfer.getData('text/plain')
      const obj = JSON.parse(data)
      const size = +obj.size
      const orientation = obj.isVertical ? 'vertical' : 'horizontal'
      const x = +e.target.dataset.x
      const y = +e.target.dataset.y
      console.log(x)
      console.log(y)

      try {
        callback(size, x, y, orientation)
        draggedShip.remove()
        draggedShip = null
        console.log(e.target)
        console.log(
          'Remaining ships:',
          document.querySelectorAll('.dock .ship').length
        )
      } catch (err) {
        console.log(err)
      }
    })
  }

  function onOpponentClick(callback) {
    opponentBoard.addEventListener('click', (e) => {
      if (!e.target.classList.contains('cell')) return
      if (
        e.target.classList.contains('ship') ||
        e.target.classList.contains('empty')
      ) {
        callback(+e.target.dataset.x, +e.target.dataset.y)
      }
    })
  }

  function renderPlayerBoard(player) {
    const board = player.gameboard.board
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
        } else if (board[i][j].isSunk()) {
          cell.textContent = 'X'
          cell.classList.add('sunk')
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
          cell.classList.add('hit-opponent')
        } else if (board[i][j].isMiss()) {
          cell.textContent = '·'
          cell.classList.add('miss')
        } else if (board[i][j].isSunk()) {
          cell.textContent = 'X'
          cell.classList.add('sunk')
        }
        opponentBoard.appendChild(cell)
      }
    }
  }

  function disableBoard() {
    opponentBoard.style.pointerEvents = 'none'
  }

  function enableBoard() {
    opponentBoard.style.pointerEvents = 'auto'
  }

  function showWinMessage(text) {
    const message = document.createElement('div')
    message.classList.add('win-message')
    message.textContent = text
    gameboard.appendChild(message)
  }

  return {
    renderPlayerBoard,
    renderOpponentBoard,
    generateDock,
    removeDock,
    onOpponentClick,
    disableBoard,
    enableBoard,
    showWinMessage,
    onPlaceShip,
    onRandomClick,
    onNextClick,
    generateControls,
    removeControls,
    removeSelect,
  }
}
