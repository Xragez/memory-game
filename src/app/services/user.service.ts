import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/compat/database';
import DbUser from "../models/db-user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase) {
  }

  getUserById(uid: string): AngularFireObject<DbUser> {
    return this.db.object(`users/${uid}`);
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
