import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Projeto } from '../modules/gerente/cadastro-projeto/projeto';
import { projetoBusca } from '../modules/gerente/cadastro-projeto/projetoBusca';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { ContagemPorMes } from '../modules/gerente/dashboard/contagemPorMes';
import { ContagemPorMesNoAno } from '../modules/gerente/cadastro-projeto/contagemPorMesNoAno ';
import { Usuario } from '../login/usuario';


@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  apiURL: string = environment.apiURLBase + '/gerente/projeto';
  apiURLperfil: string = environment.apiURLBase + '/api/usuarios';
  constructor( private http: HttpClient ) {}

  salvar( projeto: Projeto ) : Observable<Projeto> {
    return this.http.post<Projeto>( `${this.apiURL}`, projeto);
  }

  atualizar( projeto: Projeto ) : Observable<any> {
    return this.http.put<Projeto>(`${this.apiURL}/${projeto.id}` , projeto);
  }

 getProjetos(userId: string): Observable<Projeto[]> {
    const url = `${this.apiURL}/todos/${userId}`; // Concatena "/todos" à URL base
    return this.http.get<Projeto[]>(url);
  }

  getTodosProjetosUser(idUser:string):Observable<Projeto[]>{
    const url = `${this.apiURL}/todosprojetos/${idUser}`; // Concatena "/todos" à URL base
    return this.http.get<Projeto[]>(url);
  }

  getProjetoById(id: number) : Observable<Projeto> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }


  getProjetosDoUsuario(userId: string): Observable<Projeto[]> {
   const url = `${this.apiURL}/${userId}`; // Ajuste a URL conforme necessário
   return this.http.get<Projeto[]>(url);
  }

  obterNumeroDeProjetos(userId:string): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/count/${userId}`);
  }


  obterContagemProjetosPorMes(userId: string): Observable<ContagemPorMes[]> {
    return this.http.get<ContagemPorMes[]>(`${this.apiURL}/contagem-projetos-por-mes/${userId}`);
  }

  obterContagemProjetosPorMesNoAno(ano: number,userid: string): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiURL}/contagem-projetos-por-mes-no-ano/${ano}/${userid}`);
  }

  deletar(projeto: Projeto) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${projeto.id}`);
  }

  obterNumeroDePessoasNoTimeDeDev(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/count-pessoas-time-dev`);
  }

  buscarProjeto(nomeDoProjeto: string, empresa: string) : Observable<projetoBusca[]>{
    const httpParams = new HttpParams()
      .set("nomeDoProjeto", nomeDoProjeto)
      .set("empresa", empresa);

    const url = this.apiURL + "/pesquisar?=" + httpParams.toString();
    return this.http.get<any>(url);
  }

 

   // Método para obter o status do projeto
   obterStatusDoProjeto(userId: string): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiURL}/status/${userId}`);
  }

}
