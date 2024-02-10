import { Component, OnInit } from '@angular/core';
import { DividaTecnica } from './dividaTecnica';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StatusDaFaseDeGerenciamentoDT } from './statusDaFaseDeGerenciamentoDT';
import { StatusDoPagamentoDT } from './statusDoPagamentoDT';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';

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

  // Defina as enumerações diretamente aqui
  statusFaseEnum = StatusDaFaseDeGerenciamentoDT;
  statusPagamentoEnum = StatusDoPagamentoDT;

  constructor( 
   private service: DividaTecnicaService,
    private router: Router,
     private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
  
  }

  voltarParaListagem(){
     this.router.navigate(['/gerente/inicio'])
  }

  onSubmit() {
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
