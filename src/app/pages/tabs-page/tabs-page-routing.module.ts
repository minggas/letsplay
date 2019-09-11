import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs-page";
import { SessionsPage } from "../sessions/sessions";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "sessions",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../sessions/sessions.module").then(m => m.SessionsModule)
          },
          {
            path: ":sessionId",
            loadChildren: () =>
              import("../session-detail/session-detail.module").then(
                m => m.SessionDetailModule
              )
          }
        ]
      },
      {
        path: "gamers",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../speaker-list/speaker-list.module").then(
                m => m.SpeakerListModule
              )
          },
          {
            path: ":gamerId",
            loadChildren: () =>
              import("../speaker-detail/speaker-detail.module").then(
                m => m.SpeakerDetailModule
              )
          }
        ]
      },
      {
        path: "games",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../games/games.module").then(m => m.GamesPageModule)
          },
          {
            path: "shelf/:bggNames",
            loadChildren: () =>
              import("../games/games.module").then(m => m.GamesPageModule)
          },
          {
            path: ":gameId",
            loadChildren: () =>
              import("../game-detail/game-detail.module").then(
                m => m.GameDetailPageModule
              )
          }
        ]
      },
      {
        path: "",
        redirectTo: "/app/tabs/sessions",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
