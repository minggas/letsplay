import { AfterViewInit, Component } from "@angular/core";
import { Config, ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: "create-session",
  templateUrl: "./create-session.component.html",
  styleUrls: ["./create-session.component.scss"]
})
export class CreateSessionComponent implements AfterViewInit {
  session = {};
  constructor(public modalCtrl: ModalController, public navParams: NavParams) {}

  ngAfterViewInit() {}

  CreateRecord() {
    this.dismiss(this.session);
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }
}
