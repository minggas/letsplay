import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { GamesPage } from "./games.page";
import { GamesFilterComponent } from "../games-filter/games-filter.component";
import { GameData } from "../../services/games/game-data";

const routes: Routes = [
  {
    path: "",
    component: GamesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GamesPage, GamesFilterComponent],
  entryComponents: [GamesFilterComponent],
  providers: [GameData]
})
export class GamesPageModule {}
