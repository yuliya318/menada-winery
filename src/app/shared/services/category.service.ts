import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore) { }

  getFirestoreCategories(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('categories').snapshotChanges();
  }

  

  postFirestoreCategory(category: ICategory): Promise<DocumentReference>{
    return this.firestore.collection('categories').add(category);
  }

  updateFirestoreCategory(category: ICategory): Promise<void> {
    return this.firestore.collection('categories').doc(category.id).update(category);
  }

  
}

  // private categories: Array<ICategory> = [];


// async  getFirestoreCategories(): Promise<ICategory[]> {
  //   this.firestore.collection('categories').snapshotChanges().subscribe(
  //     collection => {
  //       this.categories = collection.map(category => {
  //         const data = category.payload.doc.data() as ICategory;
  //         const id = category.payload.doc.id;
  //         return { id, ...data };
  //       });
  //     }
  //   )
  //   return this.categories;
  // }

  // getCategories(): Array<ICategory> {
  //   this.getFirestoreCategories()
  //     .then
  // }