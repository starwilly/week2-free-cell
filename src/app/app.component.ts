import {Component, OnInit} from '@angular/core';
import {createDeck, shuffleCardToPiles} from './utils';
import {Card, Suit} from './models';
import {CdkDragDrop, CdkDragEnd, CdkDragStart} from '@angular/cdk/drag-drop';
import {ColumnCell, HomeCell, TempCell} from './models/cell.model';

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

  ngOnInit(): void {
    this.startNewGame();
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.item.data, event.previousContainer.data, event.container.data);
  }

  startNewGame(): void {
    const deck = createDeck();
    const piles = shuffleCardToPiles(createDeck());
    piles[0].push(new Card(Suit.diamond, 8), new Card(Suit.club, 7));
    this.tempCells = Array(4).fill(null).map(_ => new TempCell());
    this.homeCells = Array(4).fill(null).map(_ => new HomeCell());
    this.columnCells = Array(8).fill(0).map((_, index) => {
      return new ColumnCell(piles[index]);
    });
  }

  onDragStart(event: CdkDragStart) {
    const cell: ColumnCell = event.source.data.cell;
    const card: Card = event.source.data.card;
    console.log(cell.cards.indexOf(card));
    cell.dragIndex = cell.cards.indexOf(card);
  }
  onDragEnd(event: CdkDragEnd) {
    const cell: ColumnCell = event.source.data.cell;
    cell.dragIndex = -1;
  }
}
