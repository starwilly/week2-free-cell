import {Card, Suit} from './models';

export function createDeck(): Card[] {
  const deck = [];
  [Suit.club, Suit.diamond, Suit.heart, Suit.spade]
    .forEach(suit => {
      Array(13).fill(0).forEach((_, index) => {
        deck.push(new Card(suit, index + 1));
      });
    });
  return deck;
}
