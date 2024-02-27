import { Projeto } from "../cadastro-projeto/projeto";
import { statusDaFaseDeGerenciamentoDT } from './statusDaFaseDeGerenciamentoDT';
import { statusDoPagamentoDT } from './statusDoPagamentoDT';

export class DividaTecnica {
    id!: string;
    nomeDaDividaTecnica!: string;
    descricaoDaDT!: string;
    statusDaFaseDeGerenciamentoDT!: statusDaFaseDeGerenciamentoDT;
    statusDoPagamentoDT!: statusDoPagamentoDT;
    diaDoCadastro!: string; // Deve ser formatado como string de data
    projeto!: Projeto; // Relação muitos para um com Projeto
  }
  