import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { DividaTecnica } from '../cadastro-dt/dividaTecnica';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-page-dt',
  templateUrl: './page-dt.component.html',
  styleUrls: ['./page-dt.component.css']
})
export class PageDtComponent implements OnInit {

  dividaTecnicaSelecionada: DividaTecnica;
  nomeDoProjeto: string;
  empresa: string;
  dividasTecnicas: DividaTecnica[] = [];
  dividaSelecionada: DividaTecnica;
  mensagemSucesso: string;
  mensagemErro: string;
  page = 1;
  pageSize = 5;

  constructor(
    private serviceD: DividaTecnicaService,
    private router: Router,
    public dialog: MatDialog
  ) {}
 
  ngOnInit(): void {
      this.serviceD
      .getDividaTecnica()
      .subscribe( resposta => this.dividasTecnicas = resposta);
  }

  preparaDelecaoDT(dividasTecnicas: DividaTecnica){
    this.dividaSelecionada = dividasTecnicas;
  }

  deletarDT(){
   this.serviceD
     .deletar(this.dividaSelecionada)
     .subscribe( 
       response => {
         this.mensagemSucesso = 'DT deletado com sucesso!'
         this.ngOnInit();
       },
       erro => this.mensagemErro = 'Ocorreu um erro ao deletar o DT.'  
     )
  }

}
