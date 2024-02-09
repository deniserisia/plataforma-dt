import { Component, OnInit } from '@angular/core';
import { DividaTecnica } from './dividaTecnica';
import { Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { StatusDaFaseDeGerenciamentoDT } from './statusDaFaseDeGerenciamentoDT';
import { StatusDoPagamentoDT } from './statusDoPagamentoDT';

@Component({
  selector: 'app-cadastro-dt',
  templateUrl: './cadastro-dt.component.html',
  styleUrls: ['./cadastro-dt.component.css']
})
export class CadastroDtComponent implements OnInit {

  dividaTecnica: DividaTecnica = new DividaTecnica(); // Certifique-se de definir o tipo correto
  success: boolean = false;
  errors: string[] = [];
  id!: number;
  activatedRoute: any;

  // Defina as enumerações diretamente aqui
  statusFaseEnum = StatusDaFaseDeGerenciamentoDT;
  statusPagamentoEnum = StatusDoPagamentoDT;

  constructor( 
   // private service: DividaTecnicaService,
    private router: Router,
    // private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
  
  }

  voltarParaListagem(){
    // this.router.navigate(['/clientes/lista'])
  }

  onSubmit() {
   
  }

  getEnumKeys(enumObj: any): string[] {
    return Object.values(enumObj);
  }
  
}
