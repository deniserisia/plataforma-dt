import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './service/auth.guard';
import { DashboardComponent } from './modules/gerente/dashboard/dashboard.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LayoutComponent, children: [
    { path : 'usuario/dashboard', component: DashboardComponent, canActivate : [AuthGuard] },
    { path: '' , redirectTo: 'usuario/inicio', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
