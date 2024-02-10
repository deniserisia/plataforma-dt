
export class Projeto {
    id!: string;
    nomeDoProjeto!: string;
    descricao!: string;
    setor!: string;
    empresa!: string;
    nomeDoLiderDoProjeto!: string;
    statusProjeto!: string ; // Pode ser um enum em TypeScript, se necessário
    idUser!: string;
    dataCadastro: string;
  }
  