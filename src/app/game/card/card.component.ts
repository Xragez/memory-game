import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Card } from '../game.component'
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none',
      })),
      state('flipped', style({
        transform: 'perspective(600px) rotateY(180deg)'
      })),
      state('matched', style({
        visibility: 'false',
        transform: 'scale(0.05)',
        opacity: 0
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ]),
      transition('* => matched', [
        animate('400ms')
      ])
    ])
  ]
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
