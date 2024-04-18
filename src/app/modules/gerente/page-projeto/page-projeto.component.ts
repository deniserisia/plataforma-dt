import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { DividaTecnica } from '../cadastro-dt/dividaTecnica';
import { Projeto } from '../cadastro-projeto/projeto';
import { projetoBusca } from '../cadastro-projeto/projetoBusca';
import 'bootstrap';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-page-projeto',
  templateUrl: './page-projeto.component.html',
  styleUrls: ['./page-projeto.component.css']
})
export class PageProjetoComponent implements OnInit {

  nomeDoProjeto: string;
  empresa: string;
  listaDosProjetos!: projetoBusca[];
  message!: string;
  userId: string;

  projetos: Projeto[] = [];
  dividasTecnicas: DividaTecnica[] = [];
  dividaSelecionada!: DividaTecnica;
  projetoSelecionado: Projeto;
  mensagemSucesso!: string;
  mensagemErro!: string;

  page = 1;
  pageSize = 5;

 constructor(
   private service: ProjetoService,
   private serviceD: DividaTecnicaService,
   private authService: AuthService,
   private dialog: MatDialog,
   private router: Router) {}


   ngOnInit(): void {
    this.userId=localStorage.getItem("idUser")
    this.service
      .getProjetos(this.userId)
      .subscribe( resposta => this.projetos = resposta )
  }


  preparaDelecao(projeto: Projeto) {
    this.projetoSelecionado = projeto;
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

  consultarProjeto() {
    // Verifica se pelo menos um dos parâmetros de busca foi fornecido
    if (!this.nomeDoProjeto || !this.empresa || this.nomeDoProjeto.trim() === '' || this.empresa.trim() === '') {
      this.message = "Por favor, digite o nome do projeto e da empresa.";
      return; // Retorna sem enviar a solicitação
    }

    this.service
      .buscarProjeto(this.nomeDoProjeto, this.empresa)
      .subscribe(response => {
        console.log("entrou");
        // Verifica se a resposta contém dados
        if (response && response.length > 0) {
          this.listaDosProjetos = response;
          this.message = ""; // Limpa a mensagem, se houver
        } else {
          // Se a resposta estiver vazia, define a mensagem de nenhum registro encontrado
          this.listaDosProjetos = []; // Limpa a lista de projetos
          this.message = "Projeto não cadastrado ou não encontrado.";
          console.log("no meio");
        }
      }, error => {
        // Manipula erros aqui, se necessário
        console.error('Ocorreu um erro ao consultar projetos:', error);
      });
  }




}
