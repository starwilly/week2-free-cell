import {Component, OnInit} from '@angular/core';
import {createDeck} from './utils';
import {Card, Suit} from './models';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'week2-free-cell';
  columnCells: Card[][] = [];

  ngOnInit(): void {
    const deck = createDeck();
    this.columnCells = [
      [
        new Card(Suit.spade, 1),
        new Card(Suit.spade, 2),
        new Card(Suit.spade, 3),
      ],
      [
        new Card(Suit.spade, 4),
        new Card(Suit.spade, 5),
        new Card(Suit.spade, 6),
      ],
      [
        new Card(Suit.spade, 7),
        new Card(Suit.spade, 8),
        new Card(Suit.spade, 9),
      ]
    ];
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.item.data, event.previousContainer.data, event.container.data);
  }
}
