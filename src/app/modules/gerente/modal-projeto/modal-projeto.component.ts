import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { DividaTecnica } from '../cadastro-dt/dividaTecnica';
import { Projeto } from '../cadastro-projeto/projeto';
import { projetoBusca } from '../cadastro-projeto/projetoBusca';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-projeto',
  templateUrl: './modal-projeto.component.html',
  styleUrls: ['./modal-projeto.component.css']
})
export class ModalProjetoComponent implements OnInit {

 @Input() projetoSelecionado: Projeto;

 omeDoProjeto: string;
 empresa: string;
 listaDosProjetos!: projetoBusca[];
 //listaDeDT!: dTBusca[];
 message!: string;
 userId: string; // Certifique-se de obter e definir este valor após o login

 projetos: Projeto[];
 dividasTecnicas: DividaTecnica[] = [];
 dividaSelecionada!: DividaTecnica;
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
      this.projetoSelecionado = data.projetoSelecionado;
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
    if (!this.projetoSelecionado) {
      console.error("Projeto selecionado não está definido.");
      return;
    }

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

  deletarProjeto() {
    if (!this.projetoSelecionado) {
      console.error("Projeto selecionado não está definido.");
      return;
    }

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
  preparaDelecao(projeto: Projeto) {
    this.projetoSelecionado = projeto;
  }


  cancelarDelecao(): void {
    this.dialogRef.close(false); // Fecha o modal sem confirmar a exclusão
  }


}
