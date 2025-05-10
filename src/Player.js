export class Player {
  static PLAYER_TYPES = {
    HUMAN: 'human',
    AI: 'ai',
  }
  constructor(name, type, gameboard) {
    this.name = name
    this.type = type
    this.gameboard = gameboard
  }
}
