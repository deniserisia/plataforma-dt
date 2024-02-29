import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { ContagemPorMes } from './contagemPorMes';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  numeroDeProjetos: number = 0;
  numeroDeDT: number = 0;
  numeroRelatorios: number = 0;

  @ViewChild('barChart', {static: true}) barChart!: ElementRef;
  @ViewChild('barChartTwo', {static: true}) barChartTwo!: ElementRef;
  @ViewChild('pieChart', {static: true}) pieChart!: ElementRef;
  chart: any;
  chartTwo: any;
  pieChartRef: any;


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

    this.projetoService.obterContagemProjetosPorMes().subscribe(
      (contagemPorMes) => {
        // Adaptar os dados recebidos para o formato necessário para o gráfico
        const labels = contagemPorMes.map(item => item.mes);
        const data = contagemPorMes.map(item => item.quantidade);

        // Chamar a função para criar o gráfico com os dados atualizados
        this.createBarChart(labels, data);
      },
      (erro) => {
        console.error('Erro ao obter a contagem de projetos por mês:', erro);
      }
    );
    // servico de dt por tipo
    this.dividaTecnicaService.obterContagemDividasPorTipo().subscribe(
      (contagemPorTipo) => {
        const labels = Object.keys(contagemPorTipo);
        const data = Object.values(contagemPorTipo);

        // Chamar a função para criar o gráfico de pizza com os dados atualizados
        this.createPieChart(labels, data);
      },
      (erro) => {
        console.error('Erro ao obter a contagem de dívidas por tipo:', erro);
      }
    );
  }

  createBarChart(labels: string[], data: number[]) {
    const ctx = this.barChart.nativeElement.getContext('2d');
  
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
          {
            label: 'Projetos Cadastrados Por Mês',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1, // Defina o tamanho do passo para 1 para garantir números inteiros no eixo y
              callback: function (value) {
                return Number.isInteger(value as number) ? value : 0; 
              } 
            }
          }]
        }
      }
    });
  }

  // grafico pizza
createPieChart(labels: string[], data: number[]) {
  const ctx = this.pieChart.nativeElement.getContext('2d');

  this.pieChartRef = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Total de Dívidas Técnicas Cadastradas por tipo',
      },
    },
  });
}


  
}
