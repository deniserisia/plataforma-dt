import { Component, OnInit } from '@angular/core';
import { DividaTecnica } from './dividaTecnica';
import { Router, ActivatedRoute } from '@angular/router';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { Projeto } from '../cadastro-projeto/projeto';
import { ProjetoService } from 'src/app/service/projeto.service';
import { statusDoPagamentoDT } from './statusDoPagamentoDT';
import { statusDaFaseDeGerenciamentoDT } from './statusDaFaseDeGerenciamentoDT';
import { tipoDeDividaTecnica } from './tipoDeDividaTecnica';

@Component({
  selector: 'app-cadastro-dt',
  templateUrl: './cadastro-dt.component.html',
  styleUrls: ['./cadastro-dt.component.css']
})
export class CadastroDtComponent implements OnInit {
  dividaTecnica: DividaTecnica = new DividaTecnica();
  success: boolean = false;
  errors: string[] = [];
  id: number;
  statusDoPagamentoValues = Object.values(statusDoPagamentoDT);
  statusDaFaseDeGerenciamento = Object.values(statusDaFaseDeGerenciamentoDT);
  tipoDeDividaTecnicaValues = Object.values(tipoDeDividaTecnica);


  projeto: Projeto;
  projetos: Projeto[]=[];
  usuario:any;
  userId:string;

  constructor(
   private service: DividaTecnicaService,
   private serviceProjetos: ProjetoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void
  {
    this.userId=localStorage.getItem("idUser")
    this.serviceProjetos.getProjetos(this.userId).subscribe(
      projetos => this.projetos = projetos,

      error => console.error('Erro ao carregar projetos:', error)
    );

    this.usuario=this.service.obterPerfilUsuario().subscribe(
      response =>{
        this.usuario=response;
        this.dividaTecnica.idUser=this.usuario.id;
        console.log(JSON.stringify(this.usuario));
      }
    );

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.carregarDividaTecnica(this.id);
      }
    });
  }

  voltarParaListagem(): void {
     this.router.navigate(['/gerente/dividas-tecnicas']);
  }


  onSubmit(): void {



    if (this.id) {


      this.service.atualizar(this.dividaTecnica).subscribe(
        response => {
          this.success = true;
          this.errors = [];
        },
        errorResponse => {
          this.errors = ['Erro ao atualizar a Dívida Técnica.'];
        }
      );
    } else {

      this.service.salvar(this.dividaTecnica).subscribe(

        response => {
          this.success = true;
          this.errors = [];
          this.dividaTecnica = response;
        },
        errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }

  private carregarDividaTecnica(id: number): void {
    this.service.getDividaTecnicaById(id).subscribe(
      dividaTecnica => {
        this.dividaTecnica = dividaTecnica;
      },
      error => {
        console.error('Erro ao carregar dívida técnica:', error);
      }
    );
  }
}
