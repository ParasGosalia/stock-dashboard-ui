
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/components/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent , canActivate:[AuthGuard]},
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: LoginComponent, pathMatch: 'full' },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
