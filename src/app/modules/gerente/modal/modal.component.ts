import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { DividaTecnica } from '../cadastro-dt/dividaTecnica';
import { Projeto } from '../cadastro-projeto/projeto';
import { projetoBusca } from '../cadastro-projeto/projetoBusca';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

@Input() dividaTecnicaSelecionada: DividaTecnica;

 nomeDoProjeto: string;
 empresa: string;
 listaDosProjetos!: projetoBusca[];
 //listaDeDT!: dTBusca[];
 message!: string;
 userId: string; // Certifique-se de obter e definir este valor após o login

 projetos: Projeto[];
 dividasTecnicas: DividaTecnica[] = [];
 dividaSelecionada!: DividaTecnica;
 projetoSelecionado!: Projeto;
 mensagemSucesso!: string;
 mensagemErro!: string;


  constructor(
    private service: ProjetoService,
    private serviceD: DividaTecnicaService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router) {
      this.dividaTecnicaSelecionada = data.dividaTecnicaSelecionada;
    }


    ngOnInit(): void {
    this.userId=localStorage.getItem("idUser")
     this.service
       .getProjetos(this.userId)
       .subscribe( resposta => this.projetos = resposta )
       this.serviceD
       .getDividaTecnica(this.userId)
       .subscribe( resposta => this.dividasTecnicas = resposta);
   }

  confirmarDelecao(): void {
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

  cancelarDelecao(): void {
    this.dialogRef.close(false); // Fecha o modal sem confirmar a exclusão
  }

 preparaDelecao(projeto: Projeto) {
  this.projetoSelecionado = projeto;
}


 preparaDelecaoDT(dividasTecnicas: DividaTecnica){
   this.dividaSelecionada = dividasTecnicas;
 }

 deletarProjeto(){
  this.service
    .deletar(this.projetoSelecionado)
    .subscribe(
      response => {
        this.mensagemSucesso = 'Projeto deletado com sucesso!'
        this.ngOnInit();
      },
      erro => this.mensagemErro = 'Ocorreu um erro ao deletar o projeto.'
    )
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
