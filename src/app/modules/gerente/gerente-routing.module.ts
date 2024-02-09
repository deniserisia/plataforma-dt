import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroDtComponent } from './cadastro-dt/cadastro-dt.component';
import { CadastroProjetoComponent } from './cadastro-projeto/cadastro-projeto.component';


const routes: Routes = [
  {path:'gerente', component: LayoutComponent, children:[
    {path:'inicio', component: InicioComponent},
    {path:'dashboard', component: DashboardComponent},
    {path:'cadastro-divida-tecnica', component: CadastroDtComponent},
    {path:'cadastro-projeto', component: CadastroProjetoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenteRoutingModule { }
