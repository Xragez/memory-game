import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  constructor(private router: Router, private authservice: AuthService) {
  }

  onStartGame(): void {
    this.router.navigate(['game']);
  }

  openLogInForm(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authservice.Logout();
  }

  isLoggedIn: string | null;

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem("login");
  }

}
