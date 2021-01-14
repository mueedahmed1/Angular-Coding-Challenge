import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard",
  },
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', redirectTo: '/pageNotFound'},
  {path: 'pageNotFound', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
