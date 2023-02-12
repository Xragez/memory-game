import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';

  usersRef: AngularFireList<User>;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }

  create(user: User): any {
    return this.usersRef.push(user);
  }

  update(key: string, value: any): Promise<void> {
    return this.usersRef.update(key, value);
  }

  isUserInDb(email: string | any): boolean {
    this.usersRef.valueChanges().subscribe(list => {
      var usersList = list;
      var user = usersList.find(u => u.email === email);
      console.log("User is already in DB");
      return true;
    });
    console.log("User is not in DB");
    return false;
  }

}
