import {Component, OnDestroy, OnInit} from '@angular/core';
import {createDeck, shuffleCardToPiles} from './utils';
import {Card, Pile, Suit, ColumnCell, HomeCell, TempCell} from './models';
import {CdkDragDrop, CdkDragEnd, CdkDragStart} from '@angular/cdk/drag-drop';
import {CommandManager, MoveCommand} from './command';
import {Observable, Subject, timer} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

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
  private destory$ = new Subject<void>();
  timer$: Observable<number>;

  ngOnInit(): void {
    this.startNewGame();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  onCellDropped(event: CdkDragDrop<Pile>) {
    const previousCell: Pile = event.previousContainer.data;
    const cell = event.container.data;
    const movedCard = previousCell.cards.slice(event.previousIndex);
    if (previousCell !== cell && cell.canAdd(movedCard)) {
      const cmd = new MoveCommand(previousCell, cell, movedCard);
      this.commandManager.execute(cmd);
    }
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
  }

  private setupTimer(): void {
      this.timer$ = timer(0, 1000);
  }

  onDragStart(event: CdkDragStart) {
    const cell: ColumnCell = event.source.data.cell;
    const card: Card = event.source.data.card;
    cell.dragIndex = cell.cards.indexOf(card);
    console.log(event.source.element.nativeElement.style.top);
  }

  onDragEnd(event: CdkDragEnd) {
    const cell: ColumnCell = event.source.data.cell;
    cell.dragIndex = -1;
  }

  onRestart(): void {
    this.startNewGame(this.initPiles);
  }

  onNewGame(): void {
    this.startNewGame();
  }


}
