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
    return this.http.get<DividaTecnica[]>(this.apiURL);
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
  

  obterContagemDividasPorTipo(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiURL}/contagem-por-tipo`);
  }

  deletar(dividaTecnica: DividaTecnica) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${dividaTecnica.id}`);
  }
}
