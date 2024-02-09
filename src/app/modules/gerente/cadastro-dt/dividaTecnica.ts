import { Projeto } from "../cadastro-projeto/projeto";
import { StatusDaFaseDeGerenciamentoDT } from "./statusDaFaseDeGerenciamentoDT";
import { StatusDoPagamentoDT } from "./statusDoPagamentoDT";

export class DividaTecnica {
    id: string;
    nomeDaDividaTecnica: string;
    descricaoDaDT: string;
    statusDoPagamento: StatusDoPagamentoDT; // Usando o enum StatusDoPagamentoDT
    statusDaFaseDeGerenciamento: StatusDaFaseDeGerenciamentoDT; // Usando o enum SatusDaFaseDeGerenciamentoDT
    diaDoCadastro: string; // Deve ser formatado como string de data
    projeto: Projeto; // Relação muitos para um com Projeto
  }
  