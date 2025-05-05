import { Gameboard } from '../Gameboard.js'
import { Ship } from '../Ship.js'

test('initial gameboard', () => {
  const gameboard = new Gameboard()

  const allNull = gameboard.board.every((row) =>
    row.every((cell) => cell === null)
  )
  expect(allNull).toBe(true)
})

test('place ship horizontal', () => {
  const gameboard = new Gameboard()
  const ship = new Ship(4)
  gameboard.placeShip(ship, 1, 1, 'horizontal')

  expect(gameboard.board[1][1]).toBe(ship)
  expect(gameboard.board[1][2]).toBe(ship)
  expect(gameboard.board[1][3]).toBe(ship)
  expect(gameboard.board[1][4]).toBe(ship)
  expect(gameboard.board[1][5]).toBe('.')
})

test('place ship vertical', () => {
  const gameboard = new Gameboard()
  const ship = new Ship(4)
  gameboard.placeShip(ship, 1, 1, 'vertical')

  expect(gameboard.board[1][1]).toBe(ship)
  expect(gameboard.board[2][1]).toBe(ship)
  expect(gameboard.board[3][1]).toBe(ship)
  expect(gameboard.board[4][1]).toBe(ship)
  expect(gameboard.board[5][1]).toBe('.')
  console.log(gameboard)
})

test('ship goes beyond the board ', () => {
  const gameboard = new Gameboard()
  const ship = new Ship(4)

  expect(() => gameboard.placeShip(ship, 1, 9, 'horizontal')).toThrow(
    'ship goes beyond the board'
  )
})

test('ship goes beyond the board(2) ', () => {
  const gameboard = new Gameboard()
  const ship = new Ship(4)

  expect(() => gameboard.placeShip(ship, 9, 1, 'vertical')).toThrow(
    'ship goes beyond the board'
  )
})

test('ship is superimposed on another ', () => {
  const gameboard = new Gameboard()
  const ship = new Ship(4)
  gameboard.placeShip(ship, 1, 1, 'vertical')
  const ship2 = new Ship(1)

  expect(() => gameboard.placeShip(ship2, 1, 1, 'vertical')).toThrow(
    'ship is superimposed on another'
  )
})

test('ship too close to another ', () => {
  const gameboard = new Gameboard()
  const ship = new Ship(4)
  gameboard.placeShip(ship, 1, 1, 'vertical')
  const ship2 = new Ship(1)

  expect(() => gameboard.placeShip(ship2, 0, 1, 'vertical')).toThrow(
    'ship too close to another'
  )
})

test('finalizeboard', () => {
  const gameboard = new Gameboard()
  const ship = new Ship(4)
  gameboard.placeShip(ship, 1, 1, 'vertical')
  expect(gameboard.board[0][0]).toBe('.')
  gameboard.finalizeBoard()
  expect(gameboard.board[0][0]).toBe(null)
  expect(gameboard.board[1][1]).toEqual({ ship: ship, isHit: false })
})

test('recieveAttack is missed', () => {
  const gameboard = new Gameboard()
  const ship = new Ship(4)
  gameboard.placeShip(ship, 1, 1, 'vertical')
  gameboard.finalizeBoard()
  expect(gameboard.recieveAttack(9, 9)).toBe(false)
  expect(gameboard.board[9][9]).toBe('.')
})

test('recieveAttack is targeted', () => {
  const gameboard = new Gameboard()
  const ship = new Ship(4)
  gameboard.placeShip(ship, 1, 1, 'vertical')
  gameboard.finalizeBoard()
  expect(gameboard.recieveAttack(1, 1)).toBe(true)
  expect(gameboard.board[1][1].ship.hits).toBe(1)
})

test('recieveAttack twice on the same cell', () => {
  const gameboard = new Gameboard()
  const ship = new Ship(4)
  gameboard.placeShip(ship, 1, 1, 'vertical')
  gameboard.finalizeBoard()
  gameboard.recieveAttack(1, 1)
  expect(() => gameboard.recieveAttack(1, 1)).toThrow(
    'This cell already attacked'
  )
  gameboard.recieveAttack(9, 9)
  expect(() => gameboard.recieveAttack(9, 9)).toThrow(
    'This cell already attacked'
  )
})

test('all ships sunk', () => {
  const gameboard = new Gameboard()
  const ship = new Ship(4)
  gameboard.placeShip(ship, 1, 1, 'vertical')
  const ship2 = new Ship(1)
  gameboard.placeShip(ship2, 9, 9, 'vertical')
  gameboard.finalizeBoard()
  expect(gameboard.allShipsSunk()).toBe(false)
  gameboard.recieveAttack(1, 1)
  gameboard.recieveAttack(2, 1)
  gameboard.recieveAttack(3, 1)
  gameboard.recieveAttack(4, 1)
  expect(gameboard.allShipsSunk()).toBe(false)
  gameboard.recieveAttack(9, 9)
  expect(gameboard.allShipsSunk()).toBe(true)
})
