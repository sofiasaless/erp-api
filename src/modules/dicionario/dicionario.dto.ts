import { DocumentReference } from "firebase-admin/firestore";

export type ProdutoDicionario = {
  id_produto: string,
  label: string,
}

export class DicionarioDTO {
  id_empresa?: string;
  id_dicionario?: string;
  empresa_reference: DocumentReference;
  dicionario_produtos: ProdutoDicionario[];
}