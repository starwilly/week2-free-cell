import {Card, Suit} from './models';
import shuffle from 'lodash-es/shuffle';

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

export function shuffleCardToPiles(cards: Card[], size: number = 8): Card[][] {
  const shuffledCards = shuffle(cards);
  const output = Array(size);
  shuffledCards.forEach((card, i) => {
    const idx = i % size;
    output[idx] = output[idx] ? [...output[idx], card] : [card];
  });
  return output;
}
