import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IInquiry } from '../interfaces/inquiry.interface';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private firestore: AngularFirestore) { }

  getFirestoreInquiries(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('inquiries').snapshotChanges();
  }

  postFirestoreInquiry(inquiry: IInquiry): Promise<DocumentReference>{
    return this.firestore.collection('inquiries').add(inquiry);
  }

  updateFirestoreInquiry(inquiry: IInquiry): Promise<void> {
    return this.firestore.collection('inquiries').doc(inquiry.id).update(inquiry);
  }

}
