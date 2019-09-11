import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { AccountPage } from "./account";
import { AccountPageRoutingModule } from "./account-routing.module";
import { UserDataService } from "../../services/user/user-data.service";

@NgModule({
  imports: [CommonModule, IonicModule, AccountPageRoutingModule],
  declarations: [AccountPage],
  providers: [UserDataService]
})
export class AccountModule {}
