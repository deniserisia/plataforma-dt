import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { InicioComponent } from './modules/gerente/inicio/inicio.component';
import { AuthGuard } from './service/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LayoutComponent, children: [
    { path : 'gerente/inicio', component: InicioComponent, canActivate : [AuthGuard] },
    { path: '' , redirectTo: 'gerente/inicio', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
