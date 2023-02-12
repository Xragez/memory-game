import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
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

  isUserInDb(email: string | any): void {
    const users = this.usersRef.valueChanges().forEach(user => {
      if (!(user.length === 0)) {
        console.log(user);
        let found = false;
        for (let i = 0; i < user.length; i++) {
          if (user[i].email === email) {
            found = true;
            break;
          }
        }

        if (!found) {
          var userDB = new User();
          userDB.email = email;
          this.create(userDB);
        }
        
      } else {
        var userDB = new User();
        userDB.email = email;
        this.create(userDB);
      }
    });
  }

}
