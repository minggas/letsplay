import { Component, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

import { AuthService } from "../../services/user/auth.service";
import { PlayerDataService } from "../../services/players/player-data.service";

@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
  styleUrls: ["./signup.scss"]
})
export class SignupPage {
  username: string = "";
  password: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public player: PlayerDataService,
    public user: AuthService
  ) {}

  async onSignup() {
    const { username, password } = this;

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(
        username + "@letsplay.com",
        password
      );
      await this.player.newPlayer({
        username: res.user.email.split("@")[0],
        id: res.user.uid
      });

      this.router.navigateByUrl("/login");
    } catch (err) {
      console.dir(err);
    }
  }
}
