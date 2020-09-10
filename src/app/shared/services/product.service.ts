import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private firestore: AngularFirestore) { }

  getFirestoreProducts(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('products').snapshotChanges();
  }

  postFirestoreProduct(product: IProduct): Promise<DocumentReference>{
    return this.firestore.collection('products').add(product);
  }

  updateFirestoreProduct(product: IProduct): Promise<void> {
    return this.firestore.collection('products').doc(product.id).update(product);
  }

  deleteFirestoreProduct(id: string): Promise<void> {
    return this.firestore.collection('products').doc(id).delete();
  }

}