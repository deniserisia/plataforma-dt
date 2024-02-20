import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GerenteRoutingModule } from './gerente-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroDtComponent } from './cadastro-dt/cadastro-dt.component';
import { CadastroProjetoComponent } from './cadastro-projeto/cadastro-projeto.component';
import { FormsModule } from '@angular/forms';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RelatorioComponent } from './relatorio/relatorio.component';


@NgModule({
  declarations: [
    InicioComponent, DashboardComponent, CadastroDtComponent, CadastroProjetoComponent, MeuPerfilComponent, RelatorioComponent
  ],
  imports: [
    CommonModule,
    GerenteRoutingModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports:[
    InicioComponent, DashboardComponent, CadastroDtComponent, CadastroProjetoComponent
  ]
})
export class GerenteModule { }
