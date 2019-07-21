import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../models';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() cards: Card[];

  constructor() { }

  ngOnInit() {
  }

}
