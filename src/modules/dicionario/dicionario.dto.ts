import { DocumentReference } from "firebase-admin/firestore";

export type ProdutoDicionario = {
  id_produto: string,
  label: string,
}

export class DicionarioDTO {
  id?: string;
  id_empresa?: string;
  empresa_reference: DocumentReference;
  dicionario_produtos: ProdutoDicionario[];
}