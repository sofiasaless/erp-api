import { Injectable } from '@nestjs/common';
import { ProdutoDTO } from './produto.dto';

@Injectable()
export class ProdutoService {
  private produtos: ProdutoDTO[] = []

  private static id_empresaTemplate: string = 'IEtFbUYnrImdpmoHliTy'

  public criar(produto: ProdutoDTO): void {
    const produtoParaSerCriado: ProdutoDTO = {
      ...produto,
      rotativo: 0,
      data_criacao: new Date(),
    }

    this.produtos.push(produtoParaSerCriado)
  }

  public listarTodos(): ProdutoDTO[] {
    return this.produtos
  }

  public encontrarPorId(id_produto: string): ProdutoDTO | undefined {
    return this.produtos.find(prod => prod.id_produto === id_produto)
  }

  public remover(id_produto: string): void {
    this.produtos.filter(prod => prod.id_produto !== id_produto)
  }
}
