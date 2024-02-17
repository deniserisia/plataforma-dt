import { Component, OnInit } from '@angular/core';
import { DividaTecnica } from './dividaTecnica';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { statusDoPagamentoDT } from './statusDoPagamentoDT';
//import { statusDaFaseDeGerenciamentoDT } from './statusDaFaseDeGerenciamento';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { statusDaFaseDeGerenciamentoDT } from './statusDaFaseDeGerenciamentoDT';
import { Projeto } from '../cadastro-projeto/projeto';
import { ProjetoService } from 'src/app/service/projeto.service';

@Component({
  selector: 'app-cadastro-dt',
  templateUrl: './cadastro-dt.component.html',
  styleUrls: ['./cadastro-dt.component.css']
})
export class CadastroDtComponent implements OnInit {

  dividaTecnica: DividaTecnica = new DividaTecnica(); // Certifique-se de definir o tipo correto
  success: boolean = false;
  errors: string[] = [];
  id: number;
  statusDoPagamentoValues = Object.values(statusDoPagamentoDT);
  statusDaFaseDeGerenciamento = Object.values(statusDaFaseDeGerenciamentoDT);
  projetos: Projeto[] = [];  // Lista de projetos

  constructor( 
   private service: DividaTecnicaService,
   private serviceProjetos: ProjetoService,
    private router: Router,
     private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Carregue a lista de projetos no momento da inicialização do componente
    this.serviceProjetos.getProjetos().subscribe(
      projetos => this.projetos = projetos,
      error => console.error('Erro ao carregar projetos:', error)
    );
  }

  voltarParaListagem(){
     this.router.navigate(['/gerente/inicio'])
  }

  onSubmit() {

    this.dividaTecnica.projeto = this.projetos.find(projeto => projeto.id === this.dividaTecnica.projeto.id);

    if (this.id) {
      this.service
        .atualizar(this.dividaTecnica)
        .subscribe(response => {
            this.success = true;
            this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar a Dívida Técnica.'];
        });
    } else {
      this.service
        .salvar(this.dividaTecnica)
        .subscribe(response => {
            this.success = true;
            this.errors = [];
            this.dividaTecnica = response;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        });
    }
  }
  
}
