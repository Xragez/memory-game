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
  revealedCards: Card[] = []


  constructor() {
    this.numberOfCards = this.cardColumns * this.cardRows;


  }

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
    let numberList: number[] = [...Array(this.numberOfCards/2).keys()]
    numberList.push(...Array(this.numberOfCards/2).keys())
    return numberList.sort((a, b) => 0.5 - Math.random());
  }

  startGame(): void {

  }

  onCardReveal(card: Card): void {
    if (card.state === 'default' && this.revealedCards.length < 2 && !this.revealedCards.includes(card)) {
      card.state = 'flipped';
      this.revealedCards.push(card)
      console.log(this.revealedCards)

      if (this.revealedCards.length > 1) {
        this.checkCards(this.revealedCards[0], this.revealedCards[1])
      }

    } else if (card.state === 'flipped' && !this.revealedCards.includes(card)) {
      card.state = 'default';
    }
  }

  checkCards(card1: Card, card2: Card): void {
    setTimeout(() => {
      const state = card1.number === card2.number ? 'matched' : 'default';
      card1.state = card2.state = state;
      this.revealedCards = []
    }, 1000)
  }

  ngOnInit(): void {
    this.cards = this.generateCards();
  }

  private getCard(id: number): Card {
    for (let row of this.cards) {
      for (let card of row) {
        if (card.id === id) {
          return card;
        }
      }
    }
    return this.cards[0][0];
  }
}

export interface Card {
  number: number | undefined
  id: number
  state: 'default' | 'flipped' | 'matched';
}
