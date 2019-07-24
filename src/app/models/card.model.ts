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

  isSameColor(card): boolean {
    const mapping = {
      [Suit.spade]: 'black',
      [Suit.heart]: 'red',
      [Suit.diamond]: 'red',
      [Suit.club]: 'black'
    };
    return mapping[this.suit] === mapping[card.suit];
  }
}
