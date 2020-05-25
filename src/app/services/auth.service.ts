import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }
  login(user: User){

  }

  register(user: User){
    console.log(this.afa);
    return this.afa.createUserWithEmailAndPassword(user.email ,user.password );
  }
  logut(user: User){

  }

  getAuth(){

  }
}
