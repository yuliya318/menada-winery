import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IRecipe } from '../interfaces/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private firestore: AngularFirestore) { }

  getFirestoreRecipes(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('recipes').snapshotChanges();
  }

  postFirestoreRecipe(recipe: IRecipe): Promise<DocumentReference>{
    return this.firestore.collection('recipes').add(recipe);
  }

  updateFirestoreRecipe(recipe: IRecipe): Promise<void> {
    return this.firestore.collection('recipes').doc(recipe.id).update(recipe);
  }

  deleteFirestoreRecipe(id: string): Promise<void> {
    return this.firestore.collection('recipes').doc(id).delete();
  }
}
