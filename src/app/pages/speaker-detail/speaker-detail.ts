import { Component, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PlayerDataService } from "../../services/players/player-data.service";

@Component({
  selector: "page-speaker-detail",
  templateUrl: "speaker-detail.html",
  styleUrls: ["./speaker-detail.scss"]
})
export class SpeakerDetailPage {
  speaker: any;

  constructor(
    private dataProvider: PlayerDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    const speakerId = this.route.snapshot.paramMap.get("speakerId");
    this.dataProvider.getPlayer(speakerId).subscribe(result => {
      this.speaker = result.data();
    });
  }
}
