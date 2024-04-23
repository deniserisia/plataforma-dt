import { Projeto } from "../cadastro-projeto/projeto";
import { statusDaFaseDeGerenciamentoDT } from './statusDaFaseDeGerenciamentoDT';
import { statusDoPagamentoDT } from './statusDoPagamentoDT';
import { tipoDeDividaTecnica } from "./tipoDeDividaTecnica";
export class DividaTecnica {
    id: string;
    nomeDaDividaTecnica: string;
    descricaoDaDT: string;
    causaDaDT: string;
    idUser:number;
    esforcoDoPagammento: number;
    quantidadeDePessoas: number;
    valorPorHoraDeTrabalho: number;
    tipoDeDividaTecnica: tipoDeDividaTecnica;
    statusDaFaseDeGerenciamentoDT: statusDaFaseDeGerenciamentoDT;
    statusDoPagamentoDT: statusDoPagamentoDT;
    diaDoCadastro: string;
    id_projeto:number;
    projeto:string;
  }
