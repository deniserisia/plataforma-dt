import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Projeto } from '../modules/gerente/cadastro-projeto/projeto';
import { projetoBusca } from '../modules/gerente/cadastro-projeto/projetoBusca';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  apiURL: string = environment.apiURLBase + '/gerente';

  constructor( private http: HttpClient ) {}

  salvar( projeto: Projeto ) : Observable<Projeto> {
    return this.http.post<Projeto>( `${this.apiURL}`, projeto);
  }

  atualizar( projeto: Projeto ) : Observable<any> {
    return this.http.put<Projeto>(`${this.apiURL}/${projeto.id}` , projeto);
  }

  getProjetos() : Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.apiURL);
  }
  
  getProjetoById(id: number) : Observable<Projeto> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
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
