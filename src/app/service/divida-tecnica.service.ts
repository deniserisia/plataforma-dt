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
    const url = `${this.apiURL}/todas`; // Concatena "/todos" à URL base
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

  obterContagemDividasTecnicasPorMesNoAno(ano: number): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiURL}/contagem-dividas-tecnicas-por-mes-no-ano?ano=${ano}`);
  }

  obterStatusPagamento(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiURL}/status-pagamento`);
  }

 
  obterEsforcoDoPagamentoPorNomeDoProjeto(nomeDoProjeto: string): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/esforco-do-pagamento-por-projeto?nomeDoProjeto=${nomeDoProjeto}`);
  }

  obterContagemDividasPorTipo(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiURL}/contagem-por-tipo`);
  }

  obterDadosEsforcoProjeto(): Observable<{ projetos: string[], esforcos: number[] }> {
    return this.http.get<{ projetos: string[], esforcos: number[] }>(`${this.apiURL}/dados-esforco-projeto`);
  }

  deletar(dividaTecnica: DividaTecnica) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${dividaTecnica.id}`);
  }
}
