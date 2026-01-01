import { DocumentReference } from "firebase-admin/firestore";
import { VendaDTO } from "../venda/venda.dto";
import { IsString, MinLength } from "class-validator";

export type TipoFuncionario = 'CAIXA' | 'GERENTE' | 'GARCOM' | 'VENDEDOR'

export class FuncionarioDTO {
  id?: string;
  empresa_reference: DocumentReference;
  tipo: TipoFuncionario;
  permissao: TipoFuncionario[];
  
  @IsString()
  nome: string;
  
  telefone?: string;

  @IsString()
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
  vendas: VendaDTO[]
}

export type ListaFuncionarioDTO = {
  total: number,
  funcionarios: FuncionarioDTO[]
}