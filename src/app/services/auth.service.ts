import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    return this.fireauth.signInWithPopup(provider).then((result) => {
      console.log('You have been successfully logged in!');
      localStorage.setItem("login", "true");
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
