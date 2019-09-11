import { Component } from "@angular/core";

import { SessionsDataService } from "../../services/sessions/sessions-data.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "page-session-detail",
  styleUrls: ["./session-detail.scss"],
  templateUrl: "session-detail.html"
})
export class SessionDetailPage {
  session: any;
  isFavorite = false;
  defaultHref = "";
  constructor(
    private dataProvider: SessionsDataService,
    private route: ActivatedRoute
  ) {}
  sessionClick(item: string) {
    console.log("Clicked", item);
  }
  /* toggleFavorite() {
    if (this.userProvider.hasFavorite(this.session.name)) {
      this.userProvider.removeFavorite(this.session.name);
      this.isFavorite = false;
    } else {
      this.userProvider.addFavorite(this.session.name);
      this.isFavorite = true;
    }
  } */
  ionViewWillEnter() {
    const sessionId = this.route.snapshot.paramMap.get("sessionId");
    this.dataProvider.readSession(sessionId).subscribe((data: any) => {
      const time = data.PlayDate.toDate();
      console.log(time);
      this.session = data;
    });
  }
  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/sessions`;
  }

  addPlayer() {
    this.session.Players.push("nielison");
    this.updateSession();
  }

  updateSession() {
    const sessionId = this.route.snapshot.paramMap.get("sessionId");
    this.dataProvider.update_Session(sessionId, this.session);
  }
}
