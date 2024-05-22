import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { projetoBusca } from '../cadastro-projeto/projetoBusca';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { DividaTecnica } from '../cadastro-dt/dividaTecnica';
import { Projeto } from '../cadastro-projeto/projeto';
import { jsPDF } from 'jspdf';
import { TemplateRelatorioComponent } from '../template-relatorio/template-relatorio.component';
import { TemplateService } from 'src/app/service/template.service';
import * as html2pdf from 'html2pdf.js';
import { RelatorioService } from 'src/app/service/relatorio.service';
@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RelatorioComponent implements OnInit {
  @ViewChild(TemplateRelatorioComponent)
  templateRelatorioComponent!: TemplateRelatorioComponent;

  projeto2: any;
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
  numerodeRelatorios: number = 0;

  // Propriedades de configuração de paginação
  page = 1;
  pageSize = 5;
  idInicial = 1;
  constructor(
    private service: ProjetoService,
    private serviceD: DividaTecnicaService,
    private authService: AuthService,
    private templateService: TemplateService,
    private router: Router,
    private relatorioservice: RelatorioService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('idUser');

    this.service
      .getProjetos(this.userId)
      .subscribe((resposta) => (this.projetos = resposta));
    this.serviceD
      .getDividaTecnica(this.userId)
      .subscribe((resposta) => (this.dividasTecnicas = resposta));
  }

  printpdf(id: string) {
    localStorage.setItem('idProjeto', id);
    //incrementar o contador
    this.relatorioservice.incrementar();
    // this.templateRelatorioComponent.obterProjeto();

    let content_rel = null;
    content_rel = document.getElementById('relatorio');
    this.templateRelatorioComponent.obterProjeto();
    //this.templateRelatorioComponent.obterDividasTecnicas();

    var opt = {
      margin: 1,
      filename: 'relatorio.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf().set(opt).from(content_rel).save();
  }
}
