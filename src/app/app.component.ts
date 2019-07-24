import {Component, OnInit} from '@angular/core';
import {createDeck} from './utils';
import {Card, Suit} from './models';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {ColumnCell, HomeCell, TempCell} from './models/pile.model';

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
    const deck = createDeck();
    this.tempCells = Array(4).fill(null).map(_ => new TempCell());
    this.homeCells = Array(4).fill(null).map(_ => new HomeCell());
    this.columnCells = Array(8).fill(0).map(_ => new ColumnCell());
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.item.data, event.previousContainer.data, event.container.data);
  }
}
