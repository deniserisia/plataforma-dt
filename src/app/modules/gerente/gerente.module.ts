import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GerenteRoutingModule } from './gerente-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroDtComponent } from './cadastro-dt/cadastro-dt.component';
import { CadastroProjetoComponent } from './cadastro-projeto/cadastro-projeto.component';
import { FormsModule } from '@angular/forms';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { TemplateRelatorioComponent } from './template-relatorio/template-relatorio.component';
import { PageProjetoComponent } from './page-projeto/page-projeto.component';
import { PageDtComponent } from './page-dt/page-dt.component';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalProjetoComponent } from './modal-projeto/modal-projeto.component';


@NgModule({
  declarations: [
   DashboardComponent, CadastroDtComponent, CadastroProjetoComponent, MeuPerfilComponent, RelatorioComponent, TemplateRelatorioComponent, PageProjetoComponent, PageDtComponent, ModalComponent, ModalProjetoComponent
  ],
  imports: [
    CommonModule,
    GerenteRoutingModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule
  ],
  exports:[
   DashboardComponent, CadastroDtComponent, CadastroProjetoComponent
  ]
})
export class GerenteModule { }
