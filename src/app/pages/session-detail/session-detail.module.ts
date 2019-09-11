import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SessionDetailPage } from "./session-detail";
import { SessionDetailPageRoutingModule } from "./session-detail-routing.module";
import { IonicModule } from "@ionic/angular";
import { SessionsDataService } from "../../services/sessions/sessions-data.service";

@NgModule({
  imports: [CommonModule, IonicModule, SessionDetailPageRoutingModule],
  declarations: [SessionDetailPage],
  providers: [SessionsDataService]
})
export class SessionDetailModule {}
