import {Card} from './card.model';
import reduceRight from 'lodash-es/reduceRight';

interface Pile {
  cards: Card[];

  canMove(card: Card): boolean;

  canAdd(newCards: Card[]): boolean;
}

abstract class AbstractCell implements Pile {
  protected _cards: Card[];
  protected maxSize: number;

  protected constructor(maxSize: number) {
    this._cards = [];
    this.maxSize = maxSize;
  }

  get cards(): Card[] {
    return this._cards;
  }

  canMove(card: Card): boolean {
    throw new Error('Not implement');
  }

  canAdd(newCards: Card[]): boolean {
    throw new Error('Not implement');
  }

  addCards(cards: Card[]) {
    this._cards = [...this._cards, ...cards];
  }

  removeCards(index: number): Card[] {
    const removed = this._cards.slice(index);
    this._cards = [...this._cards.slice(0, index)];
    return removed;
  }
}

export class ColumnCell extends AbstractCell {
  dragIndex = -1;
  private canMoves: boolean [];

  constructor(cards: Card[]) {
    super(13);
    this._cards = cards;
    this.updateCanMoves();
  }

  private updateCanMoves(): void {
    const result = Array(this._cards.length).fill(true);
    if (this._cards.length <= 1) {
      return;
    }
    for (let i = this._cards.length - 2; i >= 0; i--) {
      const currentCard = this._cards[i];
      const nextCard = this._cards[i + 1];
      result[i] = result[i + 1] && (currentCard.rank - nextCard.rank) === 1 && !nextCard.isSameColor(currentCard);
    }
    this.canMoves = result;
  }

  canMove(card: Card): boolean {
    const index = this._cards.indexOf(card);
    return this.canMoves[index];
  }

  canAdd(newCards: Card[]): boolean {
    if (newCards.length === 0) {
      return false;
    }
    if (this._cards.length === 0) {
      return true;
    }

    const last: Card = this._cards[this._cards.length - 1];
    const next: Card = newCards[0];
    return last.rank - next.rank === 1 && !last.isSameColor(next);
  }

  addCards(cards: Card[]) {
    super.addCards(cards);
    this.updateCanMoves();
  }

  removeCards(index: number): Card[] {
    const result = super.removeCards(index);
    this.updateCanMoves();
    return result;
  }
}

export class HomeCell extends AbstractCell {
  constructor() {
    super(13);
  }
}

export class TempCell extends AbstractCell {
  constructor() {
    super(1);
  }
}
