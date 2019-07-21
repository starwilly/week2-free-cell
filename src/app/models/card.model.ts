export enum Suit {
  spade,
  heart,
  diamond,
  club
}

export class Card {
  constructor(private _suit, private _rank) {
  }

  get suit(): Suit {
    return this._suit;
  }

  get rank(): number {
    return this._rank;
  }
}
