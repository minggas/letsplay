import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { SignupPage } from "./signup";
import { SignupPageRoutingModule } from "./signup-routing.module";
import { PlayerDataService } from "../../services/players/player-data.service";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SignupPageRoutingModule],
  declarations: [SignupPage],
  providers: [PlayerDataService]
})
export class SignUpModule {}
