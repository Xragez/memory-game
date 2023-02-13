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

  constructor(private fireAuth: AngularFireAuth, private router: Router, private userService: UserService) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new FacebookAuthProvider());
  }

  AuthLogin(provider: any) {
    return this.fireAuth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      if (user){
        this.userService.create(user.uid, {
          email: user.email ?? '',
          highScore: {}
        });
      }
      this.router.navigate(['']);
    }).catch((error) => {
      console.log(error.message);
    })
  }


  Logout() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      window.location.reload();
    }).catch((error) => {
      console.log(error.message);
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
}
