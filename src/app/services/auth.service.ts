import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth'
import { FacebookAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = new User();

  constructor(private fireauth: AngularFireAuth, private router: Router, private userService: UserService) { }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new FacebookAuthProvider());
  }

  AuthLogin(provider: any) {
    return this.fireauth.signInWithPopup(provider).then((result) => {
      console.log('You have been successfully logged in!');
      localStorage.setItem("login", "true");
      const user = result.user;
      if (!this.userService.isUserInDb(user?.email)) {
        var dbUser = new User();
        dbUser.email = user?.email;
        console.log(dbUser);
        this.userService.create(dbUser);
      }
      this.router.navigate(['']);
    }).catch((error) => {
      console.log(error.message);
    })
  }


  Logout() {
    return this.fireauth.signOut().then((result) => {
      console.log("You have been successfully logged out!");
      localStorage.removeItem("login");
      window.location.reload();
    }).catch((error) => {
      console.log(error.message);
    })
  }


}
