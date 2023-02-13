import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../services/auth.service';
import {noop} from "rxjs";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private router: Router, private authService: AuthService) {}

  onStartGame(): void {
    this.router.navigate(['game']).then(noop);
  }

  onSettings(): void {
    this.router.navigate(['settings']).then(noop);
  }

  onHighScores(): void {
    this.router.navigate(['high-scores']).then(noop)
  }

  openLogInForm(): void {
    this.router.navigate(['/login']).then(noop);
  }

  logout(): void {
    this.authService.Logout().then(noop);
  }


  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

}
