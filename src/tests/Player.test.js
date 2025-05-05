import { Gameboard } from '../Gameboard.js'
import { Ship } from '../Ship.js'
import { Player } from '../Player.js'

test('player created', () => {
  const player = new Player('Human', new Gameboard())
  expect(player.type).toBe('Human')
  expect(player.gameboard).toBeInstanceOf(Gameboard)
})
