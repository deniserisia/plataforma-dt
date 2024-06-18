import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DividaTecnicaService } from 'src/app/service/divida-tecnica.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { RelatorioService } from 'src/app/service/relatorio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('resultadoModal') resultadoModal: any;
  @ViewChild('barChart', { static: true }) barChart!: ElementRef;
  @ViewChild('lineChart', { static: true }) lineChart!: ElementRef;
  @ViewChild('pieChart', { static: true }) pieChart!: ElementRef;
  @ViewChild('pieChartTwo', { static: true }) pieChartTwo!: ElementRef;
  @ViewChild('pieChartTres', { static: true }) pieChartTres!: ElementRef;
  @ViewChild('pieChartStatus', { static: true }) pieChartStatus!: ElementRef;

  nomeDoProjeto: string;
  esforcoDoPagamento: number = 0;
  numeroDeProjetos: number = 0;
  numeroDeDT: number = 0;
  numeroRelatorios: number = 0;
  numeroDePessoas: number = 0;
  projetos: any[] = [];
  dividasTecnicas: any[];
  projetoSelecionado: any = null;
  dividaTecnicaSelecionada: any;
  pieChartStatusRef: any;
  chartOne: any;
  chart: any;
  chartTwo: any;
  chartTres: any;
  pieChartRef: any;
  usuario: any;
  userId: string;
  dividasTecnicasDoProjeto: any[] = [];
  resultadoDoEsforco: number | undefined;
  dividaTecnica: any;

  constructor(
    private projetoService: ProjetoService,
    private dividaTecnicaService: DividaTecnicaService,
    private relatorioservice: RelatorioService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('idUser');
    this.obterContagemDividasTecnicasPorMesNoAno();
    this.obterContagemProjetosPorMesNoAno();
    this.carregarProjetos();

    this.projetoService.obterStatusDoProjeto(this.userId).subscribe(
      (statusProjetos: any) => {
        const labels = Object.keys(statusProjetos);
        const data = Object.values(statusProjetos).map((value: any) =>
          Number(value)
        );
        this.createPieChartStatus(labels, data);
      },
      (error) => {
        console.error('Erro ao obter o status dos projetos:', error);
      }
    );

    this.relatorioservice.contador$.subscribe((valor) => {
      this.numeroRelatorios = valor;
    });

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
        const labels = contagemPorMes.map((item) => item.mes);
        const data = contagemPorMes.map((item) => item.quantidade);
        this.createBarChart(labels, data);
      },
      (erro) => {
        console.error('Erro ao obter a contagem de projetos por mês:', erro);
      }
    );

    this.dividaTecnicaService.obterContagemDividasPorTipo(this.userId).subscribe(
      (contagemPorTipo) => {
        const labels = Object.keys(contagemPorTipo);
        const data = Object.values(contagemPorTipo);
        this.createPieChart(labels, data);
      },
      (erro) => {
        console.error('Erro ao obter a contagem de dívidas por tipo:', erro);
      }
    );

    this.dividaTecnicaService.obterStatusFaseGerenciamento(this.userId).subscribe(
      (data) => {
        const labels = Object.keys(data);
        const values = Object.values(data);
        this.criarGraficoStatusFaseGerenciamento(labels, values);
      },
      (erro) => {
        console.error('Erro ao obter a contagem de dívidas por tipo:', erro);
      }
    );

    this.dividaTecnicaService.obterStatusPagamento(this.userId).subscribe(
      (statusDaDT) => {
        const labels = Object.keys(statusDaDT);
        const data = Object.values(statusDaDT);
        this.createPieChartTwo(labels, data);
      },
      (erro) => {
        console.error('Erro ao obter a contagem de dívidas por tipo:', erro);
      }
    );
  }

  ordenarMeses(labels: string[], data: number[]) {
    const mesesDoAno = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const mesQuantidadeMap = labels.reduce((acc, label, index) => {
      acc[label] = data[index];
      return acc;
    }, {});

    const labelsOrdenados = mesesDoAno.filter(mes => mesQuantidadeMap[mes] !== undefined);
    const dataOrdenada = labelsOrdenados.map(mes => mesQuantidadeMap[mes]);

    return { labelsOrdenados, dataOrdenada };
  }

  // GRAFICO DO STATUS DOS PROJETOS
  createPieChartStatus(labels: string[], data: number[]) {
    const ctx = this.pieChartStatus.nativeElement.getContext('2d');
    this.pieChartStatusRef = new Chart(ctx, {
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
          text: 'Status dos Projetos',
        },
      },
    });
  }

  // GRAFICO DA FASE DE GERECIAMENTO DA DT
  criarGraficoStatusFaseGerenciamento(labels: string[], data: number[]) {
    const ctx = this.pieChartTres.nativeElement.getContext('2d');
    this.chartTres = new Chart(ctx, {
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
          text: 'Fases dos Gereciamento dos Pagamentos',
        },
      },
    });
  }

  carregarProjetos() {
    this.projetoService.getProjetos(this.userId).subscribe(
      (projetos: any[]) => {
        this.projetos = projetos;
      },
      (error) => {
        console.error('Erro ao carregar projetos:', error);
      }
    );
  }

  onProjetoChange() {
    if (this.projetoSelecionado) {
      const id = this.projetoSelecionado;
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
      this.dividaTecnicaService
        .getDividaTecnicaById(this.dividaTecnicaSelecionada)
        .subscribe(
          (dividatecnica: any) => {
            this.dividaTecnica = dividatecnica;
            this.resultadoDoEsforco =
              this.dividaTecnicaService.calcularResultadoDoEsforco(
                this.dividaTecnica
              );
          },
          (error) => {
            console.error('Erro ao obter dívidas técnicas do projeto:', error);
          }
        );

      // this.resultadoDoEsforco = this.dividaTecnicaService.calcularResultadoDoEsforco(this.dividaTecnica);
    } else {
      this.resultadoDoEsforco = undefined;
    }
  }

  // Método para abrir o modal
  abrirModal() {
    this.resultadoModal.nativeElement.showModal();
  }
 //teste
  obterContagemProjetosPorMesNoAno() {
    const ano = new Date().getFullYear();
    let usrid = localStorage.getItem('idUser');
    this.projetoService.obterContagemProjetosPorMesNoAno(ano, usrid).subscribe(
      (contagemPorMesNoAno: Map<string, number>) => {
        const meses = Object.keys(contagemPorMesNoAno);
        const quantidades = Object.values(contagemPorMesNoAno);
        this.createBarChart(meses, quantidades);
      },
      (erro) => {
        console.error(
          'Erro ao obter a contagem de projetos por mês no ano:',
          erro
        );
      }
    );
  }

  createBarChart(labels: string[], data: number[]) {
    const { labelsOrdenados, dataOrdenada } = this.ordenarMeses(labels, data);
    const ctx = this.barChart.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labelsOrdenados,
        datasets: [
          {
            label: 'Projetos Cadastrados Por Mês',
            data: dataOrdenada,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      },
      options: {
        title: {
          display: false,
          text: 'Contagem de Projetos por Mês'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
      },
    });
  }

  createLineChart(labels: string[], data: number[]) {
    const { labelsOrdenados, dataOrdenada } = this.ordenarMeses(labels, data);
    const ctx = this.lineChart.nativeElement.getContext('2d');
    this.chartOne = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labelsOrdenados,
        datasets: [
          {
            label: 'Dívidas Técnicas Cadastradas Por Mês',
            data: dataOrdenada,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
          },
        ],
      },
      options: {
        title: {
          display: false,
          text: 'Contagem de Dívidas Técnicas por Mês'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
      },
    });
  }

  obterContagemDividasTecnicasPorMesNoAno() {
    const ano = new Date().getFullYear();
    let iduser = localStorage.getItem('idUser');
    this.dividaTecnicaService
      .obterContagemDividasTecnicasPorMesNoAno(ano, iduser)
      .subscribe(
        (contagemPorMesNoAno: Map<string, number>) => {
          const meses = Object.keys(contagemPorMesNoAno);
          const quantidades = Object.values(contagemPorMesNoAno);
          this.createLineChart(meses, quantidades);
        },
        (erro) => {
          console.error(
            'Erro ao obter a contagem de dívidas técnicas por mês no ano:',
            erro
          );
        }
      );
  }

  

  // GRAFICO - TOTAL DE DT
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

  // STATUS DO PAGAMENTO
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
          text: 'Status do Pagamento da Dívida Técnica',
        },
      },
    });
  }
}
