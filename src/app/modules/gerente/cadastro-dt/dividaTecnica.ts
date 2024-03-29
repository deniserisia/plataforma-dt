import { Projeto } from "../cadastro-projeto/projeto";
import { statusDaFaseDeGerenciamentoDT } from './statusDaFaseDeGerenciamentoDT';
import { statusDoPagamentoDT } from './statusDoPagamentoDT';
import { tipoDeDividaTecnica } from "./tipoDeDividaTecnica";

export class DividaTecnica {
    id: string;
    nomeDaDividaTecnica: string;
    descricaoDaDT: string;
    causaDaDT: string;
    esforcoDoPagammento: number;
    tipoDeDividaTecnica: tipoDeDividaTecnica;
    statusDaFaseDeGerenciamentoDT: statusDaFaseDeGerenciamentoDT;
    statusDoPagamentoDT: statusDoPagamentoDT;
    diaDoCadastro: string;
    projeto!: Projeto; // Relação muitos para um com Projeto
  }
  