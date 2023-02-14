import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import DbUser from "../models/db-user.model";
import HighScore from '../models/high-score.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase) {
  }

  getUserById(uid: string): Observable<DbUser> {
    // @ts-ignore
    return this.db.object(`users/${uid}`).valueChanges();
  }

  getUsers() {
    return this.db.list('/users');
  }

  isUserInDb(uid: string): Promise<boolean> {
    return this.db.database.ref(`users/${uid}`).once("value").then((snapshot) => {
      return snapshot.val() != null;
    })
  }

  create(uid: string, user: DbUser): any {
    return this.db.database.ref(`users/${uid}`).set(user);
  }

  update(uid: string, user: DbUser): Promise<void> {
    return this.db.database.ref(`users/${uid}`).update(user);
  }

}
