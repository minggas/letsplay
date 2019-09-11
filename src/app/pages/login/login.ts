import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../services/user/auth.service";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
  styleUrls: ["./login.scss"]
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  async onLogin() {
    const { username, password } = this;
    try {
      this.auth.login(username + "@letsplay.com", password);
      this.router.navigateByUrl("/app/tabs/sessions");
    } catch (err) {
      console.dir(err);
    }
  }

  onSignup() {
    this.router.navigateByUrl("/signup");
  }
}
