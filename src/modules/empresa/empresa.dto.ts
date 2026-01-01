import { PLANOS } from "src/enum/planos.enum"

export type AtalhosRapidosEmpresa = {
  id: string,
  label: string,
  criado_em: Date
}

export type AtalhosRapidosEmpresaResponse = {
  id: string,
  label: string,
  criado_em: string
}

export type TaxaServico = {
  valor_taxa: number,
  esta_habilitado: boolean
}

export class EmpresaDTO {
  id?: string;
  img_perfil?: string;
  nome: string;
  descricao?: string;
  cnpj?: string;
  endereco?: string;
  telefone?: string;
  plano: PLANOS;
  email: string;
  email_contato: string;
  senha?: string;
  estado: boolean;
  atalhos_rapidos?: AtalhosRapidosEmpresaResponse[];
  taxa_servico?: TaxaServico;
  data_criacao: Date;
}

export function toAtalhosRapidosEmpresaReponse (atalhos: AtalhosRapidosEmpresa[]) {
  if (atalhos === undefined) return []
  const convertidos: AtalhosRapidosEmpresaResponse[] = atalhos.map((atalho) => {
    return {
      id: atalho.id,
      label: atalho.label,
      criado_em: 'Não informado'
    }
  })
  return convertidos
}

export class EstatisticasEmpresaDTO {
  total_empresas: number;
  total_empresas_ativas: number;
  total_empresas_inativas: number;
  total_empresas_gestor: number;
  total_empresas_pdv: number;
  total_empresas_completo: number;
}