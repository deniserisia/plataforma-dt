import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DividaTecnica } from '../modules/gerente/cadastro-dt/dividaTecnica';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ContagemPorMesDTO } from '../modules/gerente/cadastro-dt/contagemPorMesDTO';

@Injectable({
  providedIn: 'root'
})
export class DividaTecnicaService {

 
  apiURL: string = environment.apiURLBase + '/gerente/divida-tecnica';

  constructor( private http: HttpClient ) {}

  salvar( dividaTecnica: DividaTecnica ) : Observable<DividaTecnica> {
    return this.http.post<DividaTecnica>( `${this.apiURL}`, dividaTecnica);
  }

  atualizar( dividaTecnica: DividaTecnica ) : Observable<any> {
    return this.http.put<DividaTecnica>(`${this.apiURL}/${dividaTecnica.id}` , dividaTecnica);
  }

  getDividaTecnica() : Observable<DividaTecnica[]> {
    const url = `${this.apiURL}/todas`;
    return this.http.get<DividaTecnica[]>(url);
  }
  
  getDividaTecnicaById(id: number) : Observable<DividaTecnica> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  obterNumeroDeDT(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/count`);
  }

  obterContagemProjetosPorMes(): Observable<ContagemPorMesDTO[]> {
    return this.http.get<ContagemPorMesDTO[]>(`${this.apiURL}/contagem-por-mes`);
  }

  // esse aqui do grafico
  obterContagemDividasTecnicasPorMesNoAno(ano: number): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiURL}/contagem-dividas-tecnicas-por-mes-no-ano?ano=${ano}`);
  }

  obterStatusPagamento(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiURL}/status-pagamento`);
  }


  obterContagemDividasPorTipo(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiURL}/contagem-por-tipo`);
  }

  obterCustoQuitacaoPorProjeto(): Observable<{ projeto: string, custoQuitação: number }[]> {
    return this.http.get<{ projeto: string, custoQuitação: number }[]>(`${this.apiURL}/custo-quitação-por-projeto`);
  }

  obterDividasTecnicasDoProjeto(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/dividas-tecnicas/projeto/${id}`);
  }

  obterEsforcoDoPagamentoPorDivida(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/esforco-do-pagamento-por-divida?id=${id}`);
  }

  calcularResultadoDoEsforco(dividaTecnica: any): number {
    const horasDeTrabalho = dividaTecnica.quantidadeDePessoas * dividaTecnica.valorPorHoraDeTrabalho;
    const resultadoDoEsforco = dividaTecnica.resultadoDoesforcoDoPagammento * horasDeTrabalho;
    return resultadoDoEsforco;
  }

  obterDadosEsforcoProjeto(): Observable<{ projetos: string[], esforcos: number[] }> {
    return this.http.get<{ projetos: string[], esforcos: number[] }>(`${this.apiURL}/dados-esforco-projeto`);
  }

  deletar(dividaTecnica: DividaTecnica) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${dividaTecnica.id}`);
  }
}
