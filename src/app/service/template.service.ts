import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private templateConteudo: string = ''; // Conteúdo do template

  constructor() { }

  setTemplateConteudo(conteudo: string): void {
    this.templateConteudo = conteudo;
  }

  getTemplateConteudo(): string {
    return this.templateConteudo;
  }
}
