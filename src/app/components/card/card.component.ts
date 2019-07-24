import {Component, Input, OnInit} from '@angular/core';
import {Card, Suit} from '../../models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  constructor() { }

  ngOnInit() {
  }

  get imgSrc(): string {
    return `/assets/images/cards_background/${Suit[this.card.suit].toUpperCase()[0]}${this.card.rank}.png`;
  }

}
