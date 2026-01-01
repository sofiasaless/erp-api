import { db } from "@/config/firebase";
import admin from "firebase-admin";

export abstract class PatternService {
  protected COLLECTION_NAME: string

  constructor(collection_name: string) {
    this.COLLECTION_NAME = collection_name;
    this.setup();
  }

  protected setup() {
    return db.collection(this.COLLECTION_NAME);
  }

  protected firestore_db() {
    return db;
  }

  protected firestore_admin() {
    return admin;
  }

}