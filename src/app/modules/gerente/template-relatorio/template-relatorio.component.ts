
import { Component, Inject, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { DividaTecnica } from '../cadastro-dt/dividaTecnica';
import { Projeto } from '../cadastro-projeto/projeto';

@Component({
  selector: 'app-template-relatorio',
  templateUrl: './template-relatorio.component.html',
  styleUrls: ['./template-relatorio.component.css']
})
export class TemplateRelatorioComponent implements OnInit {

  projetos: Projeto[] = [];
  dividasTecnicas: DividaTecnica[] = [];
  userId:string;
  constructor(
    private projetoService: ProjetoService,
    private dividaTecnicaService: DividaTecnicaService
  ) { }

  ngOnInit(): void {
    this.userId=localStorage.getItem("idUser")
    this.obterProjetos();
    this.obterDividasTecnicas();
  }

  obterProjetos(): void {
    this.projetoService.getProjetos(this.userId)
      .subscribe(projetos => this.projetos = projetos);
  }

  obterDividasTecnicas(): void {
    this.dividaTecnicaService.getDividaTecnica(this.userId)
      .subscribe(dividasTecnicas => this.dividasTecnicas = dividasTecnicas);
  }

}
