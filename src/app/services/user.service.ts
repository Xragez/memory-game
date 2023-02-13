import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import DbUser from "../models/db-user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase) {
  }

  create(uid: string, user: DbUser): any {
    return this.db.database.ref(`users/${uid}`).set(user);
  }

  update(uid: string, user: DbUser): Promise<void> {
    return this.db.database.ref(`users/${uid}`).update(user);
  }

}
