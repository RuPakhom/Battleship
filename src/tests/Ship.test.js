import { Ship } from '../Ship.js'

test('initial hits', () => {
  const ship = new Ship(1)
  expect(ship.hits).toBe(0)
})

test('ship of length 1 is sunk after first hit', () => {
  const ship = new Ship(1)
  ship.hit()
  expect(ship.isSunk()).toBe(true)
  expect(ship.hits).toBe(1)
})

test('hit function', () => {
  const ship = new Ship(3)
  ship.hit()
  expect(ship.hits).toBe(1)
  ship.hit()
  expect(ship.hits).toBe(2)
})

test('hit does not increment hits after ship is sunk', () => {
  const ship = new Ship(3)
  ship.hit()
  ship.hit()
  ship.hit()
  ship.hit()
  expect(ship.isSunk()).toBe(true)
  expect(ship.hits).toBe(3)
})

test('initial isSunk', () => {
  const ship = new Ship(1)
  expect(ship.isSunk()).toBe(false)
})

test('isSunk function', () => {
  const ship = new Ship(2)
  ship.hit()
  expect(ship.isSunk()).toBe(false)
  ship.hit()
  expect(ship.isSunk()).toBe(true)
})
