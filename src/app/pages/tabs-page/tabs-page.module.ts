import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { TabsPage } from "./tabs-page";
import { TabsPageRoutingModule } from "./tabs-page-routing.module";

import { GamesPageModule } from "../games/games.module";

import { SessionsModule } from "../sessions/sessions.module";
import { SessionDetailModule } from "../session-detail/session-detail.module";
import { SpeakerDetailModule } from "../speaker-detail/speaker-detail.module";
import { SpeakerListModule } from "../speaker-list/speaker-list.module";

@NgModule({
  imports: [
    GamesPageModule,
    CommonModule,
    IonicModule,
    SessionsModule,
    SpeakerDetailModule,
    SpeakerListModule,
    TabsPageRoutingModule,
    SessionDetailModule
  ],
  declarations: [TabsPage]
})
export class TabsModule {}
