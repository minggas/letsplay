import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "app/sessions",
    pathMatch: "full"
  },
  {
    path: "account",
    loadChildren: () =>
      import("./pages/account/account.module").then(m => m.AccountModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: "support",
    loadChildren: () =>
      import("./pages/support/support.module").then(m => m.SupportModule)
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then(m => m.LoginModule)
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./pages/signup/signup.module").then(m => m.SignUpModule)
  },
  {
    path: "app",
    loadChildren: () =>
      import("./pages/tabs-page/tabs-page.module").then(m => m.TabsModule),
    canActivate: [AngularFireAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
