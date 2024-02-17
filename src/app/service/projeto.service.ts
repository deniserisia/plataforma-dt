import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Projeto } from '../modules/gerente/cadastro-projeto/projeto';
import { projetoBusca } from '../modules/gerente/cadastro-projeto/projetoBusca';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  apiURL: string = environment.apiURLBase + '/gerente/projeto';

  constructor( private http: HttpClient ) {}

  salvar( projeto: Projeto ) : Observable<Projeto> {
    return this.http.post<Projeto>( `${this.apiURL}`, projeto);
  }

  atualizar( projeto: Projeto ) : Observable<any> {
    return this.http.put<Projeto>(`${this.apiURL}/${projeto.id}` , projeto);
  }

 getProjetos(): Observable<Projeto[]> {
    const url = `${this.apiURL}/todos`; // Concatena "/todos" à URL base
    return this.http.get<Projeto[]>(url);
  }  
  
 getProjetoById(id: number) : Observable<Projeto> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  //getProjetosDoUsuario(userId: string): Observable<Projeto[]> {
  //  const url = `${this.apiURL}/${userId}`; // Ajuste a URL conforme necessário
  //  return this.http.get<Projeto[]>(url);
  //}

  obterNumeroDeProjetos(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/count`);
  }

  deletar(projeto: Projeto) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${projeto.id}`);
  }

  buscarProjeto(nomeDoProjeto: string, empresa: string) : Observable<projetoBusca[]>{
    const httpParams = new HttpParams()
      .set("nomeDoProjeto", nomeDoProjeto)
      .set("empresa", empresa);

    const url = this.apiURL + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }
}
