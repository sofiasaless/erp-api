import { DocumentReference, Timestamp } from "firebase-admin/firestore";
import { db } from "src/config/firebase";
import { COLLECTIONS } from "src/enum/firestore.enum";

export function idToDocumentRef(id: string, collection: COLLECTIONS): DocumentReference {
  return db.collection(collection).doc(id);
}

function transformFieldValue(value: any): any {
  // Se for Timestamp, converte para Date
  if (value instanceof Timestamp) {
    return value.toDate();
  }
  
  // Se for DocumentReference, extrai o ID
  if (value?.id && typeof value.id === 'string') {
    return value.id || '';
  }
  
  // Se for um array, processa cada elemento
  if (Array.isArray(value)) {
    return value.map(transformFieldValue);
  }
  
  // Mantém outros valores
  return value;
}

export function docToObject<T>(
  id: string, 
  data: FirebaseFirestore.DocumentData
): T {
  const transformedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key, 
      transformFieldValue(value)
    ])
  );
  
  return { ...transformedData, id } as T;
}

