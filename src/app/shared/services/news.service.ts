import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { INews } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private firestore: AngularFirestore) { }

  getFirestoreNews(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('news').snapshotChanges();
  }

  postFirestoreNews(news: INews): Promise<DocumentReference>{
    return this.firestore.collection('news').add(news);
  }

  updateFirestoreNews(news: INews): Promise<void> {
    return this.firestore.collection('news').doc(news.id).update(news);
  }

  deleteFirestoreNews(id: string): Promise<void> {
    return this.firestore.collection('news').doc(id).delete();
  }
}
