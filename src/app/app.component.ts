import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { SwUpdate } from "@angular/service-worker";

import {
  Events,
  MenuController,
  Platform,
  ToastController
} from "@ionic/angular";

import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AuthService } from "./services/user/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: "Sessions",
      url: "/app/tabs/sessions",
      icon: "beer"
    },
    {
      title: "Gamers",
      url: "/app/tabs/gamers",
      icon: "contacts"
    },
    {
      title: "Games",
      url: "/app/tabs/games",
      icon: "filing"
    }
  ];
  loggedIn: boolean = false;

  constructor(
    private events: Events,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private auth: AuthService
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: "Update available!",
        showCloseButton: true,
        position: "bottom",
        closeButtonText: `Reload`
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }
  checkLoginStatus() {
    this.auth.user.subscribe(status => {
      if (status) {
        this.loggedIn = true;
        this.router.navigateByUrl("/app/tabs/sessions");
      } else {
        this.loggedIn = false;
        this.router.navigateByUrl("/login");
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  listenForLoginEvents() {
    this.events.subscribe("user:login", () => {
      this.checkLoginStatus();
    });

    this.events.subscribe("user:signup", () => {
      this.checkLoginStatus();
    });

    this.events.subscribe("user:logout", () => {
      this.checkLoginStatus();
    });
  }

  logout() {
    this.auth.logout();
    this.events.publish("user:logout");
    this.router.navigateByUrl("/login");
  }
}
