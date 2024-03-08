import { Projeto } from "../cadastro-projeto/projeto";
import { statusDaFaseDeGerenciamentoDT } from './statusDaFaseDeGerenciamentoDT';
import { statusDoPagamentoDT } from './statusDoPagamentoDT';
import { tipoDeDividaTecnica } from "./tipoDeDividaTecnica";

export class DividaTecnica {
    id!: string;
    nomeDaDividaTecnica!: string;
    descricaoDaDT!: string;
    causaDaDT!: string;
    esfocoDoPagammento!: string;
    tipoDeDividaTecnica!: tipoDeDividaTecnica;
    statusDaFaseDeGerenciamentoDT!: statusDaFaseDeGerenciamentoDT;
    statusDoPagamentoDT!: statusDoPagamentoDT;
    diaDoCadastro!: string; // Deve ser formatado como string de data
    projeto!: Projeto; // Relação muitos para um com Projeto
  }
  