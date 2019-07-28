import {Component, OnDestroy, OnInit} from '@angular/core';
import {createDeck, shuffleCardToPiles} from './utils';
import {Card, Pile, Suit, ColumnCell, HomeCell, TempCell} from './models';
import {CdkDragDrop, CdkDragEnd, CdkDragStart} from '@angular/cdk/drag-drop';
import {CommandManager, MoveCommand} from './command';
import {from, Observable, Subject, timer} from 'rxjs';

interface Hint {
  fromCell: Pile;
  toCell: Pile;
  cards: Card[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  columnCells: ColumnCell[];
  tempCells: TempCell[];
  homeCells: HomeCell[];

  private commandManager: CommandManager;
  private initPiles: Card[][];
  private destroy$ = new Subject<void>();
  timer$: Observable<number>;
  hint: Hint;
  showFromHint = false;
  showToHint = false;

  ngOnInit(): void {
    this.startNewGame();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCellDropped(event: CdkDragDrop<Pile>) {
    const previousCell: Pile = event.previousContainer.data;
    const cell = event.container.data;
    const movedCard = previousCell.cards.slice(event.previousIndex);
    if (previousCell !== cell && cell.canAdd(movedCard)) {
      const cmd = new MoveCommand(previousCell, cell, movedCard);
      this.commandManager.execute(cmd);
      this.closeHint();
    }
    this.updateHint();
  }

  private startNewGame(piles: Card[][] | null = null): void {
    if (!piles) {
      const deck = createDeck();
      piles = shuffleCardToPiles(deck);
      this.initPiles = piles;
    }
    this.commandManager = new CommandManager();
    this.tempCells = Array(4).fill(null).map(_ => new TempCell());
    this.homeCells = [Suit.club, Suit.heart, Suit.diamond, Suit.spade]
      .map(suit => new HomeCell(suit));
    this.columnCells = Array(8).fill(0).map((_, index) => {
      return new ColumnCell(piles[index]);
    });
    this.setupTimer();
    this.updateHint();
  }

  private setupTimer(): void {
    this.timer$ = timer(0, 1000);
  }

  onDragStart(event: CdkDragStart) {
    const cell: ColumnCell = event.source.data.cell;
    const card: Card = event.source.data.card;
    cell.dragIndex = cell.cards.indexOf(card);
    console.log(event.source.element.nativeElement.style.top);
    this.showFromHint = false;
  }

  onDragEnd(event: CdkDragEnd) {
    const cell: ColumnCell = event.source.data.cell;
    cell.dragIndex = -1;
    this.showFromHint = true;
  }

  onRestart(): void {
    this.startNewGame(this.initPiles);
  }

  onNewGame(): void {
    this.startNewGame();
  }

  updateHint() {
    this.hint = this.getMovable(this.columnCells, this.homeCells) ||
      this.getMovable(this.tempCells, this.homeCells) ||
      this.getMovable(this.tempCells, this.columnCells) ||
      this.getMovable(this.columnCells, this.columnCells) ||
      this.getMovable(this.columnCells, this.tempCells);
  }

  openHint() {
    this.showFromHint = true;
    this.showToHint = true;
  }

  closeHint() {
    this.showFromHint = false;
    this.showToHint = false;
  }

  getMovable(fromCells: Pile[], toCells: Pile[]): Hint {
    for (const fromCell of fromCells) {
      for (const toCell of toCells) {
        if (fromCell !== toCell) {
          for (let start = fromCell.cards.length - 1; start >= 0; start--) {
            const cards = fromCell.cards.slice(start);
            if (fromCell.canMove(cards[0]) && toCell.canAdd(cards)) {
              console.log(`move card: ${cards[0].suit} ${cards[0].rank} from column cell
             to column cell ${toCells.indexOf(toCell)}`);
              return {fromCell, toCell, cards};
            }
          }
        }
      }
    }
    return null;
  }
}
