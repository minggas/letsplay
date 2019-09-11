import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { ActionSheetController } from "@ionic/angular";

import { GameData } from "../../services/games/game-data";

@Component({
  selector: "game-detail",
  templateUrl: "./game-detail.page.html",
  styleUrls: ["./game-detail.page.scss"]
})
export class GameDetailPage implements OnInit {
  game;
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public confData: GameData,
    public inAppBrowser: InAppBrowser,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get("gameId");

    this.confData.getGame(gameId).subscribe((game: any) => {
      console.log(game[0]);
      this.game = game[0];
    });
  }
}
