import { Cell } from '../Cell.js'
import { Ship } from '../Ship.js'

test('create Cell', () => {
  const cell = new Cell()
  expect(cell.state).toBe(Cell.STATES.EMPTY)
  expect(cell.ship).toBe(null)
})

test('mark empty', () => {
  const cell = new Cell()
  cell.markBlocked()
  cell.markEmpty()
  expect(cell.state).toBe(Cell.STATES.EMPTY)
  expect(cell.ship).toBe(null)
})

test('place Ship', () => {
  const ship = new Ship(2)
  const cell = new Cell()
  cell.placeShip(ship)
  expect(cell.state).toBe(Cell.STATES.SHIP)
  expect(cell.ship).toBe(ship)
})

test('mark blocked', () => {
  const cell = new Cell()
  cell.markBlocked()
  expect(cell.state).toBe(Cell.STATES.BLOCKED)
  expect(cell.ship).toBe(null)
})

test('mark blocked(2)', () => {
  const cell = new Cell()
  const ship = new Ship(2)
  cell.placeShip(ship)
  expect(() => cell.markBlocked()).toThrow("Cell can't be blocked")
})

test('mark miss', () => {
  const cell = new Cell()
  cell.markMiss()
  expect(cell.state).toBe(Cell.STATES.MISS)
  expect(cell.ship).toBe(null)
})

test('mark miss(2)', () => {
  const cell = new Cell()
  const ship = new Ship(2)
  cell.placeShip(ship)
  expect(() => cell.markMiss()).toThrow('Cell contains ship')
})

test('mark miss(3)', () => {
  const cell = new Cell()
  cell.markMiss()
  expect(() => cell.markMiss()).toThrow('Cell already marked as miss')
})

test('hit ship', () => {
  const cell = new Cell()
  const ship = new Ship(2)
  cell.placeShip(ship)
  cell.hitShip()
  expect(cell.state).toBe(Cell.STATES.HIT)
  expect(cell.ship).toBe(ship)
})

test('hit ship(2)', () => {
  const cell = new Cell()
  expect(() => cell.hitShip()).toThrow("Cell don't have a ship")
})

test('hit ship(3)', () => {
  const cell = new Cell()
  cell.markMiss()
  expect(() => cell.hitShip()).toThrow("Cell don't have a ship")
})

test('hit ship(4)', () => {
  const cell = new Cell()
  const ship = new Ship(2)
  cell.placeShip(ship)
  cell.hitShip()
  expect(() => cell.hitShip()).toThrow("Ship can't be hit twice")
})

test('isEmpty', () => {
  const cell = new Cell()
  const ship = new Ship(2)
  expect(cell.isEmpty()).toBe(true)
  cell.placeShip(ship)
  expect(cell.isEmpty()).toBe(false)
})

test('isBlocked', () => {
  const cell = new Cell()
  expect(cell.isBlocked()).toBe(false)
  cell.markBlocked()
  expect(cell.isBlocked()).toBe(true)
})

test('isShip', () => {
  const cell = new Cell()
  const ship = new Ship(2)

  expect(cell.isShip()).toBe(false)
  cell.placeShip(ship)
  expect(cell.isShip()).toBe(true)
})

test('isMiss', () => {
  const cell = new Cell()
  expect(cell.isMiss()).toBe(false)
  cell.markMiss()
  expect(cell.isMiss()).toBe(true)
})

test('isHit', () => {
  const cell = new Cell()
  expect(cell.isHit()).toBe(false)
  const ship = new Ship(2)
  cell.placeShip(ship)
  cell.hitShip()
  expect(cell.isHit()).toBe(true)
})
