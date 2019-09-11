import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SessionsPage } from "./sessions";

const routes: Routes = [
  {
    path: "",
    component: SessionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionsPageRoutingModule {}
