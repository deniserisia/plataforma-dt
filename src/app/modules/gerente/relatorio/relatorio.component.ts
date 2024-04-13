import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { projetoBusca } from '../cadastro-projeto/projetoBusca';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { DividaTecnica } from '../cadastro-dt/dividaTecnica';
import { Projeto } from '../cadastro-projeto/projeto';
import jsPDF from 'jspdf';
import { TemplateRelatorioComponent } from '../template-relatorio/template-relatorio.component';
import { TemplateService } from 'src/app/service/template.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  @ViewChild(TemplateRelatorioComponent) templateRelatorioComponent!: TemplateRelatorioComponent;


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
    private templateService: TemplateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId=localStorage.getItem("idUser")
    this.service.getProjetos(this.userId).subscribe(resposta => this.projetos = resposta);
    this.serviceD.getDividaTecnica(this.userId).subscribe(resposta => this.dividasTecnicas = resposta);
  }

}
