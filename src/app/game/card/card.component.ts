import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Card } from '../game.component'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input()
  cardData: Card

  @Output()
  revealEvent: EventEmitter<Card> = new EventEmitter()

  ngOnInit(): void {
  }

  reveal(): void {
    this.revealEvent.emit(this.cardData)
  }

}
