import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { ContagemPorMes } from './contagemPorMes';
import { ContagemPorMesNoAno } from '../cadastro-projeto/contagemPorMesNoAno ';
import * as $ from 'jquery';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('resultadoModal') resultadoModal: any; // Referência ao seu modal

  nomeDoProjeto: string;
  esforcoDoPagamento: number;
  numeroDeProjetos: number = 0;
  numeroDeDT: number = 0;
  numeroRelatorios: number = 0;
  numeroDePessoas: number = 0;

  projetos: any[] = []; // Array para armazenar os projetos
  dividasTecnicas: any[] = []; // Array para armazenar as dívidas técnicas associadas ao projeto selecionado
  projetoSelecionado: any = null; // Projeto selecionado
  dividaTecnicaSelecionada: any = null; // Dívida técnica selecionada

  @ViewChild('barChart', {static: true}) barChart!: ElementRef;
  @ViewChild('barChartTwo', {static: true}) barChartTwo!: ElementRef;
  @ViewChild('pieChart', {static: true}) pieChart!: ElementRef;
  @ViewChild('pieChartTwo', {static: true}) pieChartTwo!: ElementRef;
  @ViewChild('pieChartTres', {static: true}) pieChartTres!: ElementRef;
  @ViewChild('lineChart') private lineChart: ElementRef;
  @ViewChild('lineChartTwo', { static: true }) lineChartTwo: ElementRef;
  @ViewChild('pieChartStatus') pieChartStatus!: ElementRef;
  pieChartStatusRef: any;

  chartOne: any;
  chart: any;
  chartTwo: any;
  chartTres: any;
  pieChartRef: any;
  usuario:any;
  userId:string;

  dividasTecnicasDoProjeto: any[] = [];
  resultadoDoEsforco: number | undefined;

  constructor(
    private projetoService: ProjetoService,
    private dividaTecnicaService: DividaTecnicaService
    ) {


    }

  ngOnInit(): void {
    this.userId=localStorage.getItem("idUser");
    this.obterContagemDividasTecnicasPorMesNoAno();
    this.obterContagemProjetosPorMesNoAno();
    this.carregarProjetos();



      this.projetoService.obterStatusDoProjeto(this.userId).subscribe(
          (statusProjetos: any) => {
            const labels = Object.keys(statusProjetos);
            const data = Object.values(statusProjetos).map((value: any) => Number(value)); // Convertendo para number[]


            this.createPieChartStatus(labels, data);
          },
        (error) => {
          console.error('Erro ao obter o status dos projetos:', error);
        }
      );



    this.dividaTecnicaService.obterDadosEsforcoProjeto(this.userId).subscribe(
      (dados: any) => {
        const projetos = dados.projetos;
        const esforcos = dados.esforcos;

        // Chame a função para criar o gráfico de linha com os dados obtidos
        this.createLineChartTwo(projetos, esforcos);
      },
      (error) => {
        console.error('Erro ao obter os dados dos esforços versus os projetos:', error);
      }
    );


    // Chame seu serviço para obter o número de projetos do usuário
    this.projetoService.obterNumeroDeProjetos(this.userId).subscribe(
      (numero: number) => {
        this.numeroDeProjetos = numero;
      },
      (erro) => {
        console.error('Erro ao obter o número de projetos:', erro);
      }
    );

    this.projetoService.obterNumeroDePessoasNoTimeDeDev().subscribe(
      (numero: number) => {
        this.numeroDePessoas = numero;
      },
      (erro) => {
        console.error('Erro ao obter o número de pessoas nos projetos:', erro);
      }
    );

    // Chame seu serviço para obter o número de DT do usuário
    this.dividaTecnicaService.obterNumeroDeDT(this.userId).subscribe(
      (numero: number) => {
        this.numeroDeDT = numero;
      },
      (erro) => {
        console.error('Erro ao obter o número de DT:', erro);
      }
    );


    this.projetoService.obterContagemProjetosPorMes(this.userId).subscribe(
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
    this.dividaTecnicaService.obterContagemDividasPorTipo(this.userId).subscribe(
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


      this.dividaTecnicaService.obterStatusFaseGerenciamento(this.userId).subscribe(data => {
        const labels = Object.keys(data);
        const values = Object.values(data);

        this.criarGraficoStatusFaseGerenciamento(labels, values);
      },
      (erro) => {
        console.error('Erro ao obter a contagem de dívidas por tipo:', erro);
      });


      // servico de status da DT
      this.dividaTecnicaService.obterStatusPagamento(this.userId).subscribe(
        (statusDaDT) => {
          const labels = Object.keys(statusDaDT);
          const data = Object.values(statusDaDT);

          // Chamar a função para criar o gráfico de pizza com os dados atualizados
          this.createPieChartTwo(labels, data);
        },
        (erro) => {
          console.error('Erro ao obter a contagem de dívidas por tipo:', erro);
        }
      );
  }

  createPieChartStatus(labels: string[], data: number[]) {
    const ctx = this.pieChartStatus.nativeElement.getContext('2d');
    this.pieChartStatusRef = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
        }],
      },
      options: {
        title: {
          display: true,
          text: 'Status dos Projetos',
        },
      },
    });
  }


  criarGraficoStatusFaseGerenciamento(labels: string[], values: number[]) {
    const ctx = this.pieChartTres.nativeElement.getContext('2d');
    this.chartTres = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }




  carregarProjetos() {
  this.projetoService.getProjetos(this.userId).subscribe( (projetos: any[]) => {
        this.projetos = projetos;
      },
      (error) => {
        console.error('Erro ao carregar projetos:', error);
     }
    );
  }

  onProjetoChange() {
    if (this.projetoSelecionado) {
      const id = this.projetoSelecionado.id;
      console.log("",JSON.s
      this.dividaTecnicaService.obterDividasTecnicasDoProjeto(id).subscribe(
        (dividasTecnicas: any[]) => {
          this.dividasTecnicasDoProjeto = dividasTecnicas;
        },
        (error) => {
          console.error('Erro ao obter dívidas técnicas do projeto:', error);
        }
      );
    } else {
      this.dividasTecnicasDoProjeto = [];
    }
  }

  onDividaTecnicaChange() {
    if (this.dividaTecnicaSelecionada) {
      this.resultadoDoEsforco = this.dividaTecnicaService.calcularResultadoDoEsforco(this.dividaTecnicaSelecionada);
    } else {
      this.resultadoDoEsforco = undefined;
    }
  }



  // Método para abrir o modal
  abrirModal() {
    this.resultadoModal.nativeElement.showModal();
  }

  createLineChartTwo(projetos: string[], esforcos: number[]) {
    const ctx = this.lineChartTwo.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: projetos,
        datasets: [{
          label: 'Esforço por Projeto',
          data: esforcos,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          fill: true
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: false, // Impede que os rótulos sejam cortados
              maxRotation: 90, // Rotaciona os rótulos para melhorar a legibilidade
              minRotation: 90 // Rotaciona os rótulos para melhorar a legibilidade
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }





  obterContagemProjetosPorMesNoAno() {
    const ano = new Date().getFullYear();
    let usrid=localStorage.getItem("idUser")
    this.projetoService.obterContagemProjetosPorMesNoAno(ano,usrid).subscribe(
      (contagemPorMesNoAno: Map<string, number>) => {
        const meses = Object.keys(contagemPorMesNoAno);
        const quantidades = Object.values(contagemPorMesNoAno);
        this.createBarChart(meses, quantidades);
      },
      (erro) => {
        console.error('Erro ao obter a contagem de projetos por mês no ano:', erro);
      }
    );
  }


  createBarChart(labels: string[], data: number[]) {
    const ctx = this.barChart.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Projetos Cadastrados Por Mês',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        }
      }
    });
  }


  obterContagemDividasTecnicasPorMesNoAno() {
    const ano = new Date().getFullYear();
    let iduser=localStorage.getItem("idUser");
    this.dividaTecnicaService.obterContagemDividasTecnicasPorMesNoAno(ano,iduser).subscribe(
      (contagemPorMesNoAno: Map<string, number>) => {
        const meses = Object.keys(contagemPorMesNoAno);
        const quantidades = Object.values(contagemPorMesNoAno);
        this.createLineChart(meses, quantidades);
      },
      (erro) => {
        console.error('Erro ao obter a contagem de dívidas técnicas por mês no ano:', erro);
      }
    );
  }

  createLineChart(labels: string[], data: number[]) {
    const ctx = this.lineChart.nativeElement.getContext('2d');
    this.chartOne = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Dívidas Técnicas Cadastradas Por Mês',
          data: data,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        }
      }
    });
  }


// grafico pizza
createPieChart(labels: string[], data: number[]) {
  const ctx = this.pieChart.nativeElement.getContext('2d');

  this.chart = new Chart(ctx, {
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
        text: 'Total de Dívidas Técnicas Cadastradas',
      },
    },
  });
}

createPieChartTwo(labels: string[], data: number[]) {
  const ctx = this.pieChartTwo.nativeElement.getContext('2d');
  this.chartTwo = new Chart(ctx, {
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
        text: 'Panorama do Status do Pagamento',
      },
    },
  });
}



}
