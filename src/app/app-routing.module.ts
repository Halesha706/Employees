import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: "", redirectTo: "dashboard/employee-list", pathMatch: "full" },
  {
    path: "dashboard",
    component: UserComponent,
    loadChildren: () =>
      import("../app/user/user.module").then(
        (m) => m.UserModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
