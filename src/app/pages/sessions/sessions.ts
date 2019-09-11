import { Component, OnInit } from "@angular/core";
import { ModalController, LoadingController } from "@ionic/angular";
import { SessionsDataService } from "../../services/sessions/sessions-data.service";
import { AuthService } from "../../services/user/auth.service";
import { CreateSessionComponent } from "../create-session/create-session.component";

@Component({
  selector: "page-sessions",
  templateUrl: "sessions.html",
  styleUrls: ["sessions.scss"]
})
export class SessionsPage implements OnInit {
  sessions: any;
  loading: any;
  sessionTitle: string;
  playDate: Date;
  closeDate: Date;
  sessionData: any;
  owner;
  sessionSub;
  userSub;

  constructor(
    private loadingCtrl: LoadingController,
    private sessionService: SessionsDataService,
    private modalCtrl: ModalController,
    private afAuth: AuthService
  ) {}

  ngOnInit() {
    this.presentLoading();
    this.sessionSub = this.sessionService.read_Sessions().subscribe(data => {
      this.sessions = data.map(e => {
        this.loading.dismiss();
        const id = e.payload.doc.id;
        const result = { ...e.payload.doc.data(), id: id };
        return result;
      });
    });
    this.userSub = this.afAuth.user.subscribe(res => {
      this.owner = res.email.split("@")[0];
    });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: "loading",
      spinner: "crescent"
    });
    await this.loading.present();
  }

  CreateRecord(data) {
    let record = {};
    record["Owner"] = this.owner;
    record["Title"] = data.title;
    record["PlayDate"] = new Date(data.playdate);
    record["CloseDate"] = new Date(data.closedate);
    record["Players"] = [];
    record["Game"] = data.game || "";
    record["Result"] = "";
    this.sessionService
      .create_NewSession(record)
      .then(resp => {
        console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.sessionService.delete_Session(rowID);
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: CreateSessionComponent,
      componentProps: { SessionData: this.sessionData }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data.playdate);
      this.CreateRecord(data);
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.userSub.unsubscribe();
    this.sessionSub.unsubscribe();
  }
}
