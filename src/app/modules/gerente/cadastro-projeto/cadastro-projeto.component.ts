import { Component, OnInit, Type  } from '@angular/core';
import { Projeto } from './projeto';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StatusProjeto } from './statusProjeto';
import { ProjetoService } from 'src/app/service/projeto.service';
import { AuthService } from 'src/app/service/auth.service';
import { Usuario } from 'src/app/login/usuario';

@Component({
  selector: 'app-cadastro-projeto',
  templateUrl: './cadastro-projeto.component.html',
  styleUrls: ['./cadastro-projeto.component.css']
})
export class CadastroProjetoComponent implements OnInit {
  projeto: Projeto;
  success: boolean = false;
  errors: String[];
  id!: number;
  usuario:any;

  statusProjetos = Object.values(StatusProjeto);

  constructor(
      private service: ProjetoService,
      private router: Router,

      private activatedRoute : ActivatedRoute
      ) {
    this.projeto = new Projeto();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;

    params.subscribe(urlParams => {
        this.id = urlParams['id'];
        console.log('ID do Projeto:', this.id);  // Adicione este log para verificar se o ID está sendo recuperado corretamente
        if (this.id) {
            this.service
                .getProjetoById(this.id)
                .subscribe(
                    response => {
                        this.projeto = response;
                        console.log('Projeto obtido:', JSON.stringify(this.projeto));  // Adicione este log para verificar se o projeto está sendo recuperado corretamente
                    },
                    errorResponse => {
                        this.projeto = new Projeto();
                        console.error('Erro ao obter o Projeto:', errorResponse);
                    }
                );
        }
    });
}


  voltarParaListagem(){
    this.router.navigate(['/usuario/projetos'])
  }

  onSubmit(){
    if(this.id){
      //Pega o id do usuario logado

      let idUser=localStorage.getItem("idUser");
      this.projeto.idUser=idUser;
      this.service
        .atualizar(this.projeto)
        .subscribe(response => {
            this.success = true;
            this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o Projeto.']
        })


    }else{
      //Pega o id do usuario logado

      let idUser=localStorage.getItem("idUser");
      this.projeto.idUser=idUser;
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
