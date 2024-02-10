import { Component, OnInit } from '@angular/core';
import { ProjetoService } from 'src/app/service/projeto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  numeroDeProjetos: number = 0;

  constructor(
  private projetoService: ProjetoService
  ) { }

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
  }
}
