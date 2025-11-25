import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/config/firebase';
import { COLLECTIONS } from 'src/enum/firestore.enum';
import { DicionarioDTO, ProdutoDicionario } from './dicionario.dto';
import { idToDocumentRef } from 'src/util/firestore.util';
import admin from "firebase-admin";

@Injectable()
export class DicionarioService {

  private COLLECTION_NAME: string

  constructor() {
    this.COLLECTION_NAME = COLLECTIONS.DICIONARIO,
      this.setup()
  }

  private setup() {
    return db.collection(this.COLLECTION_NAME);
  }

  private docToObject(id: string, data: FirebaseFirestore.DocumentData): DicionarioDTO {
    return {
      id_dicionario: id,
      id_empresa: data.empresa_reference.id,
      empresa_reference: data.empresa_reference.id,
      dicionario_produtos: data.dicionario_produtos
    }
  }

  public async adicionar(id_empresa: string, item_dicionario: ProdutoDicionario, dicionario?: DicionarioDTO) {
    let query = this.setup().where("empresa_reference", "==", idToDocumentRef(id_empresa, COLLECTIONS.EMPRESAS))

    const dicionarioEncontrado = await query.get()

    // se estiver vazio, significa que precisa ser criado
    if (dicionarioEncontrado.empty) {
      const dicionarioParaCadastrar: DicionarioDTO = {
        empresa_reference: idToDocumentRef(id_empresa, COLLECTIONS.EMPRESAS),
        dicionario_produtos: [item_dicionario]
      }

      await this.setup().add(dicionarioParaCadastrar)
      return
    }

    const dicionarioRef = this.setup().doc(dicionarioEncontrado.docs[0].id)
    await dicionarioRef.update({
      ...dicionario,
      dicionario_produtos: admin.firestore.FieldValue.arrayUnion(item_dicionario),
    })

  }

  public async adicionar_EmTransacao(
    transaction: FirebaseFirestore.Transaction,
    id_empresa: string,
    item_dicionario: ProdutoDicionario,
    dicionario?: DicionarioDTO
  ) {
    const collection = this.setup();
    const empresaRef = idToDocumentRef(id_empresa, COLLECTIONS.EMPRESAS);

    const query = await collection
      .where("empresa_reference", "==", empresaRef)
      .get();

    if (query.empty) {
      // criar novo dicionário
      const newRef = collection.doc();
      transaction.set(newRef, {
        empresa_reference: empresaRef,
        dicionario_produtos: [item_dicionario]
      });
      return;
    }

    const dicRef = query.docs[0].ref;
    transaction.update(dicRef, {
      ...dicionario,
      dicionario_produtos: admin.firestore.FieldValue.arrayUnion(item_dicionario)
    });
  }

  public async encontrar(id_empresa: string): Promise<DicionarioDTO>{
    const doc = await this.setup().where("empresa_reference", "==", idToDocumentRef(id_empresa, COLLECTIONS.EMPRESAS)).get()
    if (doc.empty) throw new NotFoundException('Dicionario não encontrado')
    return this.docToObject(doc.docs[0].id, doc.docs[0].data())
  }


}
