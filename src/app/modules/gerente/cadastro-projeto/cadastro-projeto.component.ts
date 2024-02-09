import { Component, OnInit } from '@angular/core';
import { Projeto } from './projeto';
import { Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { StatusProjeto } from './statusProjeto';

@Component({
  selector: 'app-cadastro-projeto',
  templateUrl: './cadastro-projeto.component.html',
  styleUrls: ['./cadastro-projeto.component.css']
})
export class CadastroProjetoComponent implements OnInit {

  projeto!: Projeto;
  success: boolean = false;
  errors!: String[];
  id!: number;
  activatedRoute: any;
  statusProjeto = StatusProjeto;

  constructor( 
     // private service: ProjetoService,
      private router: Router,
     // private activatedRoute : ActivatedRoute
      ) {
    this.projeto = new Projeto();
  }

  ngOnInit(): void {
  
  }

  voltarParaListagem(){
    this.router.navigate(['/home/inicio'])
  }

  onSubmit(){
    


  }
  
  getEnumKeys(enumObj: any) {
  
  }

}
