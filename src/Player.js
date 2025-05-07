export class Player {
  static PLAYER_TYPES = {
    HUMAN: 'human',
    AI: 'ai',
  }
  constructor(type, gameboard) {
    this.type = type
    this.gameboard = gameboard
  }
}
