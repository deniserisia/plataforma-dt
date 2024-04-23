
import { Component, Inject, OnInit,ViewEncapsulation } from '@angular/core';
//import jsPDF from 'jspdf';
//import * as html2pdf from 'html2pdf.js';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { DividaTecnica } from '../cadastro-dt/dividaTecnica';
import { Projeto } from '../cadastro-projeto/projeto';

@Component({
  selector: 'app-template-relatorio',
  templateUrl: './template-relatorio.component.html',
  styleUrls: ['./template-relatorio.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TemplateRelatorioComponent implements OnInit {
  projeto:any;
  projetoid:number;
  nomeDoProjeto:string;
  dataCadastro1:string;
  statusProjeto:string;

  projetos: Projeto[] = [];
  dividasTecnicas: DividaTecnica[] = [];
  userId:string;
  idProjeto:string;
  constructor(
    private projetoService: ProjetoService,
    private dividaTecnicaService: DividaTecnicaService
  ) { }

  ngOnInit(): void {
   this.userId=localStorage.getItem("idUser");
   this.obterProjeto();
   //this.obterDividasTecnicas();
  }

  obterProjeto(): void {
    this.idProjeto=localStorage.getItem("idProjeto");
    this.projetoService.getProjetoById(Number(this.idProjeto))
      .subscribe(projeto => this.projeto = projeto);
      console.log(this.projeto)
      this.projetoid=this.projeto.id;
      this.nomeDoProjeto=this.projeto.nomeDoProjeto;
      this.dataCadastro1=this.projeto.dataCadastro;
      this.statusProjeto=this.projeto.statusProjeto;
      this.obterDividasTecnicas();
  }

  obterDividasTecnicas(): void {
    this.idProjeto=localStorage.getItem("idProjeto");
    this.dividaTecnicaService.getDividaTecnica(this.idProjeto)
      .subscribe(dividasTecnicas => this.dividasTecnicas = dividasTecnicas);
  }

}
