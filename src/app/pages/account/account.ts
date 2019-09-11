import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AlertController } from "@ionic/angular";
import { AuthService } from "../../services/user/auth.service";
import { UserDataService } from "../../services/user/user-data.service";
import { AuthGuard } from "../../services/user/auth.guard";

interface User {
  username: string;
  password: string;
}
@Component({
  selector: "page-account",
  templateUrl: "account.html",
  styleUrls: ["./account.scss"]
})
export class AccountPage implements OnInit {
  username: string;
  password: string;
  userSub;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserDataService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.auth.user.subscribe(res => {
      this.username = res.email.split("@")[0];
    });
  }

  updatePicture() {
    console.log("Clicked to update picture");
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: "Change Username",
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: (data: any) => {
            this.auth.changeEmail(data.password, data.username);
          }
        }
      ],
      inputs: [
        {
          type: "text",
          name: "username",
          value: this.username,
          placeholder: "username"
        },
        {
          type: "password",
          name: "password",
          value: this.password,
          placeholder: "username"
        }
      ]
    });
    await alert.present();
  }

  changePassword() {
    console.log("Clicked to change password");
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

  support() {
    this.router.navigateByUrl("/support");
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.userSub.unsubscribe();
  }
}
