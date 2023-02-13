import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.scss']
})
export class HighScoresComponent {

  usersEasy: Observable<any[]>;
  usersMedium: Observable<any[]>;
  usersHard: Observable<any[]>;

  constructor(private userService: UserService) {

    this.usersEasy = this.userService.getUsers().valueChanges();
    this.usersEasy = this.usersEasy.pipe(
      map((data) => {
        data.sort((a, b) => {
          return a.highScore.easy > b.highScore.easy ? -1 : 1;
        });
        return data;
      }))

    this.usersMedium = this.userService.getUsers().valueChanges();
    this.usersMedium = this.usersMedium.pipe(
      map((data) => {
        data.sort((a, b) => {
          return a.highScore.medium > b.highScore.medium ? -1 : 1;
        });
        return data;
      }))

    this.usersHard = this.userService.getUsers().valueChanges();
    this.usersHard = this.usersHard.pipe(
      map((data) => {
        data.sort((a, b) => {
          return a.highScore.hard > b.highScore.hard ? -1 : 1;
        });
        return data;
      }))
  }
  

}
