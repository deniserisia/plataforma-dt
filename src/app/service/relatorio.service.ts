import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  constructor() {}
  contador = new BehaviorSubject<number>(0);
  contador$ = this.contador.asObservable();

  incrementar() {
    this.contador.next(this.contador.value + 1);
  }
}
