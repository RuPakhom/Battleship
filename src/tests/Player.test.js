import { Gameboard } from '../Gameboard.js'
import { Ship } from '../Ship.js'
import { Player } from '../Player.js'

test('player created', () => {
  const player = new Player(Player.PLAYER_TYPES.HUMAN, new Gameboard())
  expect(player.type).toBe(Player.PLAYER_TYPES.HUMAN)
  expect(player.gameboard).toBeInstanceOf(Gameboard)
})
