import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroDtComponent } from './cadastro-dt/cadastro-dt.component';
import { CadastroProjetoComponent } from './cadastro-projeto/cadastro-projeto.component';
import { AuthGuard } from 'src/app/service/auth.guard';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { PageProjetoComponent } from './page-projeto/page-projeto.component';
import { PageDtComponent } from './page-dt/page-dt.component';
import { TemplateRelatorioComponent } from './template-relatorio/template-relatorio.component';


const routes: Routes = [
  {path:'usuario', component: LayoutComponent,  canActivate: [AuthGuard], children:[
    {path:'dashboard', component: DashboardComponent},
    {path:'projetos', component: PageProjetoComponent},
    {path:'dividas-tecnicas', component:PageDtComponent},
    {path:'cadastro-divida-tecnica', component: CadastroDtComponent},
    {path:'cadastro-divida-tecnica/:id', component: CadastroDtComponent},
    {path:'cadastro-projeto', component: CadastroProjetoComponent},
    {path:'cadastro-projeto/:id', component: CadastroProjetoComponent},
    {path:'emitir-relatorio', component: RelatorioComponent},
    {path:'teste', component:TemplateRelatorioComponent},
    {path:'meu-perfil-de-usuario', component: MeuPerfilComponent},
    {path:'meu-perfil-de-usuario/:id', component: MeuPerfilComponent},
    { path: '', redirectTo : '/usuario/inicio', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenteRoutingModule { }
