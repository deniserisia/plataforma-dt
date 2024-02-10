import { Component, OnInit } from '@angular/core';
import { Projeto } from './projeto';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StatusProjeto } from './statusProjeto';
import { ProjetoService } from 'src/app/service/projeto.service';

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
  statusProjeto = StatusProjeto;

  constructor( 
      private service: ProjetoService,
      private router: Router,
      private activatedRoute : ActivatedRoute
      ) {
    this.projeto = new Projeto();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getProjetoById(this.id)
            .subscribe( 
              response => this.projeto = response ,
              errorResponse => this.projeto = new Projeto()
            )
        }
    })
  }

  voltarParaListagem(){
    this.router.navigate(['/gerente/inicio'])
  }

  onSubmit(){
    if(this.id){

      this.service
        .atualizar(this.projeto)
        .subscribe(response => {
            this.success = true;
            this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o Projeto.']
        })


    }else{

      this.service
        .salvar(this.projeto)
          .subscribe( response => {
            this.success = true;
            this.errors = [];
            this.projeto = response;
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          })

    }
  }

}
