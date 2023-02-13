import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  /*
  easy:                       medium:               high:
      cardRows = 3;           cardRows = 4          cardRows = 5
      cardColumns = 4;        cardColumns = 5       cardColumns = 6
      numberOfPairs = 6;      numberOfPairs = 10    numberOfPairs = 15
  * */
  cardRows = 5;
  cardColumns = 6;
  numberOfPairs = 15;
  revealedPairs = 0;
  cards: Card[][] = []
  revealedCards: Card[] = []

  generateCards(): Card[][] {
    let id = 0;
    let cardList: Card[][] = [];
    const numbers = this.generateNumbers();
    for (let i = 0; i < this.cardRows; i++){
      const row: Card[] = []
      for (let j = 0; j < this.cardColumns; j++){
        const card: Card = {
          number: numbers.pop(),
          id,
          state: "default"
        }
        id++
        row.push(card)
      }
      cardList.push(row)
    }
    return cardList;
  }

  generateNumbers(): number[] {
    let numberList: number[] = [...Array(this.numberOfPairs).keys()]
    numberList.push(...Array(this.numberOfPairs).keys())
    return numberList.sort((a, b) => 0.5 - Math.random());
  }

  onCardReveal(card: Card): void {
    if (card.state === 'default' && this.revealedCards.length < 2 && !this.revealedCards.includes(card)) {
      card.state = 'flipped';
      this.revealedCards.push(card)

      if (this.revealedCards.length > 1) {
        this.checkCards(this.revealedCards[0], this.revealedCards[1])
      }

    } else if (card.state === 'flipped' && !this.revealedCards.includes(card)) {
      card.state = 'default';
    }
  }

  checkCards(card1: Card, card2: Card): void {
    setTimeout(() => {
      if (card1.number === card2.number) {
        card1.state = card2.state = 'matched';
        this.revealedPairs += 1;
      } else {
        card1.state = card2.state = 'default';
      }

      this.revealedCards = []
    }, 1000)
  }

  ngOnInit(): void {
    this.cards = this.generateCards();
  }
}

export interface Card {
  number: number | undefined
  id: number
  state: 'default' | 'flipped' | 'matched';
}
