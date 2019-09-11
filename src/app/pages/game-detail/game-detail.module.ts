import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { GameDetailPage } from "./game-detail.page";
import { GameData } from "../../services/games/game-data";

const routes: Routes = [
  {
    path: "",
    component: GameDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GameDetailPage],
  providers: [GameData]
})
export class GameDetailPageModule {}
