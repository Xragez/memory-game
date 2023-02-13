import {Component, Input} from '@angular/core';
import { faUser, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../services/auth.service";
import {noop} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  backArrow: boolean

  isLoggedIn: boolean;
  displayName: string;
  faUser = faUser;
  faArrowLeft = faArrowLeft;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = authService.isLoggedIn;
    this.displayName = this.isLoggedIn ? JSON.parse(localStorage.getItem('user')!).displayName : null;
  }

  back(): void {
    this.router.navigate(['']).then(noop);
  }
}
