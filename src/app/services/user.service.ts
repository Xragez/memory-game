import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';

  usersRef: AngularFireList<User>;
  users: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
    this.users = this.usersRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  create(user: User): any {
    return this.usersRef.push(user);
  }

  update(key: string, value: any): Promise<void> {
    return this.usersRef.update(key, value);
  }

  isUserInDb(email: string | any): void {
    this.usersRef.valueChanges().forEach(users => {
      if (!(users.length === 0)) {
        console.log(users);
        let found = false;
        for (let i = 0; i < users.length; i++) {
          if (users[i].email === email) {
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
