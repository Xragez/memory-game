import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  cardRows = 4
  cardColumns = 5
  numberOfCards: number
  cards: Card[][] = []

  constructor() {
    this.numberOfCards = this.cardColumns * this.cardRows;
  }

  randomCards(): Card[][] {
    let id = 0;
    let cardList: Card[][] = [];
    const numbers = this.generateNumbers();
    for (let i = 0; i < this.cardRows; i++){
      const row: Card[] = []
      for (let j = 0; j < this.cardColumns; j++){
        const card: Card = {
          number: numbers.pop(),
          id
        }
        id++
        row.push(card)
      }
      cardList.push(row)
    }
    return cardList;
  }

  generateNumbers(): number[] {
    let numberList: number[] = [...Array(this.numberOfCards/2).keys()]
    numberList.push(...Array(this.numberOfCards/2).keys())
    return numberList.sort((a, b) => 0.5 - Math.random());
  }

  ngOnInit(): void {
    this.cards = this.randomCards();
    console.log(this.cards)
  }
}

interface Card {
  number: number | undefined
  id: number
}
