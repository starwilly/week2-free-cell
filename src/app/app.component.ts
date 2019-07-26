import {Component, OnInit} from '@angular/core';
import {createDeck, shuffleCardToPiles} from './utils';
import {Card, Pile, Suit} from './models';
import {CdkDragDrop, CdkDragEnd, CdkDragStart} from '@angular/cdk/drag-drop';
import {ColumnCell, HomeCell, TempCell} from './models/cell.model';
import {CommandManager, MoveCommand} from './command';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'week2-free-cell';
  columnCells: ColumnCell[];
  tempCells: TempCell[];
  homeCells: HomeCell[];
  commandManager: CommandManager;

  ngOnInit(): void {
    this.startNewGame();
  }

  onCellDropped(event: CdkDragDrop<Pile>) {
    const previousCell: Pile = event.previousContainer.data;
    const cell = event.container.data;
    const movedCard = previousCell.cards.slice(event.previousIndex);
    if (previousCell !== cell && cell.canAdd(movedCard)) {
      const cmd = new MoveCommand(previousCell, cell, movedCard);
      this.commandManager.execute(cmd);
      // const removed = previousCell.removeCards(movedCard);
      // cell.addCards(removed);
    }
  }

  startNewGame(): void {
    const deck = createDeck();
    const piles = shuffleCardToPiles(createDeck());
    piles[0].push(new Card(Suit.diamond, 8), new Card(Suit.club, 7));
    piles[1].push(new Card(Suit.spade, 9),
      // new Card(Suit.spade, 2),
      // new Card(Suit.spade, 1),
    );
    this.commandManager = new CommandManager();
    this.tempCells = Array(4).fill(null).map(_ => new TempCell());
    this.homeCells = [Suit.club, Suit.heart, Suit.diamond, Suit.spade]
      .map(suit => new HomeCell(suit));
    this.columnCells = Array(8).fill(0).map((_, index) => {
      return new ColumnCell(piles[index]);
    });
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
    // console.log('drag end', event);
  }

  // onDragDrop(event: CdkDragDrop<any>) {
  //   const sameContainer = event.previousContainer === event.container;
  //   console.log('drop', event, sameContainer);
  // }
}
