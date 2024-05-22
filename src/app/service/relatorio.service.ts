import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  apiURL: string = environment.apiURLBase + '/gerente/emitir-relatorio';
  constructor(private http: HttpClient) {}

  obterNumerodeRelatorios(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/count/${userId}`);
  }
}
