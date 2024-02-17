import { Component, OnInit } from '@angular/core';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { ProjetoService } from 'src/app/service/projeto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  numeroDeProjetos: number = 0;
  numeroDeDT: number = 0;
  numeroRelatorios: number = 0;

  constructor(
    private projetoService: ProjetoService,
    private dividaTecnicaService: DividaTecnicaService
    ) {}

  ngOnInit(): void {
    // Chame seu serviço para obter o número de projetos do usuário
    this.projetoService.obterNumeroDeProjetos().subscribe(
      (numero: number) => {
        this.numeroDeProjetos = numero;
      },
      (erro) => {
        console.error('Erro ao obter o número de projetos:', erro);
      }
    );

    // Chame seu serviço para obter o número de DT do usuário
    this.dividaTecnicaService.obterNumeroDeDT().subscribe(
      (numero: number) => {
        this.numeroDeDT = numero;
      },
      (erro) => {
        console.error('Erro ao obter o número de DT:', erro);
      }
    );
  }
}
