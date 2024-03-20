import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { DividaTecnica } from '../cadastro-dt/dividaTecnica';
import { Projeto } from '../cadastro-projeto/projeto';
import { projetoBusca } from '../cadastro-projeto/projetoBusca';
import * as $ from 'jquery';
import 'bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';



@Component({
  selector: 'app-page-projeto',
  templateUrl: './page-projeto.component.html',
  styleUrls: ['./page-projeto.component.css']
})
export class PageProjetoComponent implements OnInit {

   // Pesquisar sobre o Projeto
 nomeDoProjeto: string;
 empresa: string;
 listaDosProjetos!: projetoBusca[];
 //listaDeDT!: dTBusca[];
 message!: string;
 userId: string; // Certifique-se de obter e definir este valor após o login

 projetos: Projeto[] = [];
 dividasTecnicas: DividaTecnica[] = [];
 dividaSelecionada!: DividaTecnica;
 projetoSelecionado!: Projeto;
 mensagemSucesso!: string;
 mensagemErro!: string;


  // Propriedades de configuração de paginação
  page = 1;
  pageSize = 5;

 constructor(
   private service: ProjetoService,
   private serviceD: DividaTecnicaService,
   private authService: AuthService,
   private dialog: MatDialog,
   private router: Router) {}

   
   ngOnInit(): void {
    this.service
      .getProjetos()
      .subscribe( resposta => this.projetos = resposta )
      this.serviceD
      .getDividaTecnica()
      .subscribe( resposta => this.dividasTecnicas = resposta);
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
        data: { projeto: this.projetoSelecionado } // Passa o objeto projetoSelecionado para o modal
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log(`Modal fechado. Resultado: ${result}`);
    });
}


 // Pesquisar sobre o projeto
 consultarProjeto(){
   this.service
     .buscarProjeto(this.nomeDoProjeto, this.empresa)
     .subscribe(response => {
      console.log("entrou");
       this.listaDosProjetos = response;
       if( this.listaDosProjetos.length <= 0 ){
         this.message = "Nenhum Registro encontrado.";
         console.log("no meio");
       }else{
         this.message = "nada";
         console.log("nada");
       }
     });
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
