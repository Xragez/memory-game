import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {noop} from "rxjs";
import {Router} from "@angular/router";
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
  cards: Card[][] = [];
  revealedCards: Card[] = [];
  difficulty: string;
  isDifficultySelected = false;
  score = 0;
  pairMatchScore = 200;
  endGameScreen = false;
  highScore: number;

  constructor(private userService: UserService, private router: Router) {
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
    this.isDifficultySelected = true;

    switch (difficulty){
      case 'easy':
        this.cardRows = 4
        this.cardColumns = 4
        this.numberOfPairs = 8
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
        this.score += this.pairMatchScore;
        if (this.revealedPairs === this.numberOfPairs) {
          console.log(this.score)
          this.checkHighScore()
        }
      } else {
        card1.state = card2.state = 'default';
        this.pairMatchScore = Math.max(this.pairMatchScore - 10, 20);
      }

      this.revealedCards = []
    }, 1000)
  }

  checkHighScore(): void {
    const uid = JSON.parse(localStorage.getItem('user')!).uid;
    this.userService.getUserById(uid).subscribe((user) => {
      const highScore = user.highScore;
      switch (this.difficulty) {
        case 'easy':
          if (highScore?.easy !== undefined && highScore.easy < this.score) {
            highScore.easy = this.score;
          }
          break;
        case 'medium':
          if (highScore?.medium !== undefined && highScore.medium < this.score) {
            highScore.medium = this.score;
          }
          break;
        case 'hard':
          if (highScore?.hard !== undefined && highScore.hard < this.score) {
            highScore.hard = this.score;
          }
      }
      this.userService.update(uid, {highScore}).then(() => {
        this.endGameScreen = true;
      })
    })
  }

  back(): void {
    this.router.navigate(['']).then(noop);
  }

  ngOnInit(): void {
  }
}

export interface Card {
  number: number | undefined
  id: number
  state: 'default' | 'flipped' | 'matched';
}
