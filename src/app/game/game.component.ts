import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {diff} from "ngx-bootstrap/chronos/moment/diff";
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  cardRows: number;
  cardColumns: number;
  numberOfPairs:number;
  revealedPairs = 0;
  cards: Card[][] = []
  revealedCards: Card[] = []
  difficulty: string
  difficultySelected = false

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

  setDifficultySettings(difficulty: string): void {
    this.difficulty = difficulty;
    this.difficultySelected = true;

    switch (difficulty){
      case 'easy':
        this.cardRows = 3
        this.cardColumns = 4
        this.numberOfPairs = 6
        break
      case 'medium':
        this.cardRows = 4
        this.cardColumns = 5
        this.numberOfPairs = 10
        break
      case 'hard':
        this.cardRows = 5
        this.cardColumns = 6
        this.numberOfPairs = 15
        break
    }
    this.cards = this.generateCards();
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
  }
}

export interface Card {
  number: number | undefined
  id: number
  state: 'default' | 'flipped' | 'matched';
}

enum DifficultyLevels {
  easy, medium, hard
}