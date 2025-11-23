export class ProdutoDTO {
  id_produto: string;
  id_empresa?: string;
  empresa_reference?: string;
  nome: string;
  categoria: string;
  categoria_reference?: string;
  uni_medida: 'GRAMAS' | 'METROS' | 'QUILO' | 'UNIDADE';
  preco_compra?: number;
  preco_venda: number;
  quantidade_estoque: number;
  rotativo: number;
  imagemProduto: string;
  codigo: string;
  categoria_impressao: 'COMUM' | 'COZINHA' | 'CHURRASQUEIRA';
  data_criacao: Date;
  ultima_atualizacao?: Date;
  ultima_reposicao?: Date;
  controle_estoque: boolean
}