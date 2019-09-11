import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SessionsDataService } from "../../services/sessions/sessions-data.service";
import { SessionsPage } from "./sessions";
import { CreateSessionComponent } from "../create-session/create-session.component";
import { SessionsFilterPage } from "../sessions-filter/sessions-filter";
import { SessionsPageRoutingModule } from "./sessions-routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SessionsPageRoutingModule],
  declarations: [SessionsPage, SessionsFilterPage, CreateSessionComponent],
  entryComponents: [SessionsFilterPage, CreateSessionComponent],
  providers: [SessionsDataService]
})
export class SessionsModule {}
