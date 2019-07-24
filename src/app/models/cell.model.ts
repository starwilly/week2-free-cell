import {Card} from './card.model';
import reduceRight from 'lodash-es/reduceRight';

interface Pile {
  cards: Card[];
}

abstract class AbstractCell implements Pile {
  protected _cards: Card[];
  private maxSize: number;

  protected constructor(maxSize: number) {
    this._cards = [];
    this.maxSize = maxSize;
  }

  get cards(): Card[] {
    return this._cards;
  }
}

export class ColumnCell extends AbstractCell {
  canMoves: boolean [];
  dragIndex = -1;
  constructor(cards: Card[]) {
    super(13);
    this._cards = cards;
    this.updateCanMoves();
  }

  private updateCanMoves(): void {
    const result = Array(this.cards.length).fill(true);
    for (let i = this.cards.length - 2; i >= 0; i--) {
      const currentCard = this.cards[i];
      const nextCard = this.cards[i + 1];
      result[i] = result[i + 1] && (currentCard.rank - nextCard.rank) === 1 && !nextCard.isSameColor(currentCard);
    }
    this.canMoves = result;
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
