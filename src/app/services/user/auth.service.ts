import { Injectable, NgZone } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";

import * as firebase from "firebase/app";

import { Observable, BehaviorSubject } from "rxjs/";
import { retry } from "rxjs/operators";

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = this.firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log("Success!", value);
      })
      .catch(err => {
        console.log("Something went wrong:", err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }

  reauthenticate = currentPassword => {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  changePassword = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            console.log("Password updated!");
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
  changeEmail = (currentPassword, newEmail) => {
    this.reauthenticate(currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updateEmail(newEmail + "@letsplay.com")
          .then(() => {
            console.log("Ok");
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
}
