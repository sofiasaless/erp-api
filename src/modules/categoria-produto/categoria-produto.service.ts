import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/config/firebase';
import { COLLECTIONS } from 'src/enum/firestore.enum';
import { idToDocumentRef } from 'src/util/firestore.util';
import { ProdutoDTO } from '../produto/produto.dto';
import { ProdutoService } from '../produto/produto.service';
import { CategoriaProdutoDTO } from './categoria-produto.dto';

@Injectable()
export class CategoriaProdutoService {

  private COLLECTION_NAME: string

  constructor(private readonly produtoService: ProdutoService) {
    this.COLLECTION_NAME = COLLECTIONS.CATEGORIA_PRODUTO,
    this.setup()
  }

  private setup() {
    return db.collection(this.COLLECTION_NAME);
  }

  private docToObject(id: string, data: FirebaseFirestore.DocumentData): CategoriaProdutoDTO {
    return {
      id: id,
      nome: data.nome,
      empresa_reference: data.empresa_reference.id || '',
      id_empresa: data.empresa_reference.id || ''
    }
  }

  public async criar(id_empresa: string, nome: string) {
    if (nome === undefined || nome === '') throw new HttpException('Necessário preencher nome para categoria', HttpStatus.BAD_REQUEST) 
    const categoriaParaSalvar: CategoriaProdutoDTO = {
      nome: nome,
      empresa_reference: idToDocumentRef(id_empresa, COLLECTIONS.EMPRESAS)
    }
    await this.setup().add(categoriaParaSalvar);
  }

  public async encontrarPorId(id_categoria: string) {
    const doc = await this.setup().doc(id_categoria).get();
    return this.docToObject(doc.id, doc.data()!)
  }

  public async listarTodos(id_empresa: string): Promise<CategoriaProdutoDTO[]> {
    let query = this.setup().where("empresa_reference", "==", idToDocumentRef(id_empresa, COLLECTIONS.EMPRESAS))
    
    const snapshot = await query.get()
    if (snapshot.empty) return []
    
    let listaCategoriasEncontradas: CategoriaProdutoDTO[] = snapshot.docs.map((categoria) => {
      return this.docToObject(categoria.id, categoria.data());
    })

    return listaCategoriasEncontradas
  }

  public async remover(id_categoria: string): Promise<void> {
    // ao remover uma categoria, todos os produtos que tem vínculo com ela devem ser atualizados
    // as atualizações de vários produtos são sensíveis a erros nativos do Firebase ou até de conexão
    // ..... por isso devem ser feitas em transação, para que um rollback aconteça caso ocorra erros inesperados
    await db.runTransaction(async (transaction) => {
      const categoriaRef = this.setup().doc(id_categoria);

      // buscando os produtos que estão associados a categoria para atualiza-los
      const produtosAssociados = await this.produtoService.encontrar("categoria_reference", "==", categoriaRef, false);

      // atualizando os produtos um por um
      produtosAssociados.forEach((produto) => {
        // a categoria do produto serão atualizadas para null, já que sua categoria irá ser removida do banco
        const produtoAtualizado: Partial<ProdutoDTO> = {
          categoria_reference: null,
        }

        // enviando transação e o produto com sua atualização de categoria
        this.produtoService.atualizar_EmTransacao(transaction, produto.id, produtoAtualizado);
      })

      // após desvincular todos os produtos da categoria, finalmente é hora de removê-la
      transaction.delete(categoriaRef)
    })
  }

  public async excluirPorEmpresa(transaction: FirebaseFirestore.Transaction, id_empresa: string) {
    const catRef = this.setup().where("empresa_reference", "==", idToDocumentRef(id_empresa, COLLECTIONS.EMPRESAS));
  
    const catSnapshot = await catRef.get();
  
    if (catSnapshot.empty) {
      return
    }
  
    catSnapshot.docs.forEach((doc) => {
      transaction.delete(doc.ref);
    });
  }

  public async atualizar(id_categoria: string, nome: string) {
    const categoriaRef = this.setup().doc(id_categoria);

    await categoriaRef.update({
      nome: nome
    });
  }

}
