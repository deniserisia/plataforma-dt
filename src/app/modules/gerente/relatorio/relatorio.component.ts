import { Component, OnInit } from '@angular/core';
import { projetoBusca } from '../cadastro-projeto/projetoBusca';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { DividaTecnica } from '../cadastro-dt/dividaTecnica';
import { Projeto } from '../cadastro-projeto/projeto';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

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

   // Propriedades de configuração de paginação
   page = 1;
   pageSize = 5;
 
  
 
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
  
 

}
