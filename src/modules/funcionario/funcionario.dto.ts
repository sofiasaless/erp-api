import { DocumentReference } from "firebase-admin/firestore";

export type TipoFuncionario = 'CAIXA' | 'GERENTE' | 'GARCOM' | 'VENDEDOR'

export class FuncionarioDTO {
  id?: string;
  empresa_reference: DocumentReference;
  tipo: TipoFuncionario;
  permissao: TipoFuncionario[];
  nome: string;
  telefone?: string;
  senha: string;
  ativo?: boolean;
  ultimo_acesso?: Date;
  data_criacao: Date
}

export class FuncionarioRequestAuthDTO {
  nome: string;
  senha: string;
}

export type FuncionarioEstatisticasVendas = {
  total_vendas: number,
  receita: number,
  vendas: any
}

export type ListaFuncionarioDTO = {
  total: number,
  funcionarios: FuncionarioDTO[]
}