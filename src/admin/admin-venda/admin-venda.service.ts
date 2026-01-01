import { COLLECTIONS } from '@/enum/firestore.enum';
import { VendaDTO } from '@/modules/venda/venda.dto';
import { PatternService } from '@/service/pattern.service';
import { docToObject, idToDocumentRef } from '@/util/firestore.util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminVendaService extends PatternService {
  constructor() {
    super(COLLECTIONS.VENDAS);
  }

  public async paginar({
    id_empresa,
    limite,
    cursor,
    cursorPrev
  }: {
    id_empresa: string;
    limite: number;
    ordem?: string;
    cursor?: string;
    cursorPrev?: string;
  }) {
    let query = this.setup().orderBy("data_venda", "desc");
    query = query.where("empresa_reference", "==", idToDocumentRef(id_empresa, COLLECTIONS.EMPRESAS));

    const total = await query.count().get();

    let snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;

    // Indo para a próxima página
    if (cursor) {
      const cursorDoc = await this.setup().doc(cursor).get();
      snapshot = await query.startAfter(cursorDoc).limit(limite).get();
    }
    // Voltando para a página anterior
    else if (cursorPrev) {
      const cursorDoc = await this.setup().doc(cursorPrev).get();
      snapshot = await query.endBefore(cursorDoc).limitToLast(limite).get();
    }
    // Primeira página
    else {
      snapshot = await query.limit(limite).get();
    }

    const vendas: VendaDTO[] = snapshot.docs.map(doc => ({
      ...docToObject<VendaDTO>(doc.id, doc.data())
    }));

    const first = snapshot.docs[0];
    const last = snapshot.docs[snapshot.docs.length - 1];

    return {
      vendas,
      total: total.data().count,
      nextCursor: last?.id ?? null,
      prevCursor: first?.id ?? null,
    };
  }
}
