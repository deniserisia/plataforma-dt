import { Component, OnInit } from '@angular/core';
import { projetoBusca } from '../cadastro-projeto/projetoBusca';
import { Projeto } from '../cadastro-projeto/projeto';
import { DividaTecnica } from '../cadastro-dt/dividaTecnica';
import { Router } from '@angular/router';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

 // Pesquisar sobre o Projeto
 nomeDoProjeto: string;
 empresa: string;
 listaDosProjetos!: projetoBusca[];
 message!: string;
 userId: string; // Certifique-se de obter e definir este valor após o login

 projetos: Projeto[] = [];
 dividasTecnicas: DividaTecnica[] = [];
 dividaSelecionada!: DividaTecnica;
 projetoSelecionado!: Projeto;
 mensagemSucesso!: string;
 mensagemErro!: string;

 exibirModalProjeto: boolean = false;
 exibirModalDT: boolean = false;
 

 constructor(
   private service: ProjetoService,
   private serviceD: DividaTecnicaService,
   private authService: AuthService,
   private router: Router) {}

   
   ngOnInit(): void {
    this.service
      .getProjetos()
      .subscribe( resposta => this.projetos = resposta )
      this.serviceD
      .getDividaTecnica()
      .subscribe( resposta => this.dividasTecnicas = resposta);
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
  this.exibirModalProjeto = true;
  console.log("exibirModalProjeto:", this.exibirModalProjeto);
}


 preparaDelecaoDT(dividasTecnicas: DividaTecnica){
   this.dividaSelecionada = dividasTecnicas;
 }

 deletarProjeto() {
  this.service
    .deletar(this.projetoSelecionado)
    .subscribe(
      response => {
        this.mensagemSucesso = 'Projeto deletado com sucesso!';
        this.exibirModalProjeto = false;
        this.ngOnInit();
      },
      erro => this.mensagemErro = 'Ocorreu um erro ao deletar o projeto.'
    );
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
