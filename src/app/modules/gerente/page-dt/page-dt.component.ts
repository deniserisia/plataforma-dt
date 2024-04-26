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

  modalAberto: boolean = false;
  dividaTecnicaSelecionada: DividaTecnica;
  nomeDoProjeto: string;
  empresa: string;
  dividasTecnicas: DividaTecnica[] = [];
  dividaSelecionada: DividaTecnica;
  mensagemSucesso: string;
  mensagemErro: string;
  page = 1;
  pageSize = 5;
  userId:string;



  constructor(
    private serviceD: DividaTecnicaService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId=localStorage.getItem("idUser")
      this.serviceD
      .getDividaTecnicas(this.userId)
      .subscribe( resposta => this.dividasTecnicas = resposta);
  }


  preparaDelecaoDT(dividasTecnicas: DividaTecnica) {
    this.dividaSelecionada = dividasTecnicas;
    this.modalAberto = true; // Abre o modal
}

fecharModal() {
    this.modalAberto = false; // Fecha o modal
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
