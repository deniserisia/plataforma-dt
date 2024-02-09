import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GerenteRoutingModule } from './gerente-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroDtComponent } from './cadastro-dt/cadastro-dt.component';
import { CadastroProjetoComponent } from './cadastro-projeto/cadastro-projeto.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [InicioComponent, DashboardComponent, CadastroDtComponent, CadastroProjetoComponent],
  imports: [
    CommonModule,
    GerenteRoutingModule,
    FormsModule
  ]
})
export class GerenteModule { }
