import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroDtComponent } from './cadastro-dt/cadastro-dt.component';
import { CadastroProjetoComponent } from './cadastro-projeto/cadastro-projeto.component';
import { AuthGuard } from 'src/app/service/auth.guard';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { PageProjetoComponent } from './page-projeto/page-projeto.component';
import { PageDtComponent } from './page-dt/page-dt.component';


const routes: Routes = [
  {path:'gerente', component: LayoutComponent,  canActivate: [AuthGuard], children:[
    {path:'inicio', component: InicioComponent},
    {path:'dashboard', component: DashboardComponent},
    {path:'projetos', component: PageProjetoComponent},
    {path:'dividas-tecnicas', component:PageDtComponent},
    {path:'cadastro-divida-tecnica', component: CadastroDtComponent},
    {path:'cadastro-divida-tecnica/:id', component: CadastroDtComponent},
    {path:'cadastro-projeto', component: CadastroProjetoComponent},
    {path:'cadastro-projeto/:id', component: CadastroProjetoComponent},
    {path:'emitir-relatorio', component: RelatorioComponent},
    {path:'meu-perfil-de-usuario', component: MeuPerfilComponent},
    {path:'meu-perfil-de-usuario/:id', component: MeuPerfilComponent},
    { path: '', redirectTo : '/gerente/inicio', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenteRoutingModule { }
