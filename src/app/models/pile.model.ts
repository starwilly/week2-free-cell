import {Card} from './card.model';

interface Pile {
  cards: Card[];
}

abstract class AbstractCell implements Pile {
  private _cards: Card[];
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
  constructor() {
    super(13);
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
