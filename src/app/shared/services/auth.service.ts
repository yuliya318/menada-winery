import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userStatusChanges = new Subject<string>();
  documentID: string;

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) { }

  signIn(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.firestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(
          snap => {
            snap.forEach(userRef => {
              localStorage.setItem('user', JSON.stringify(userRef.data()));
              // this.documentID = userRef.id;
              localStorage.setItem('userID', JSON.stringify(userRef.id));
              if (userRef.data().role === 'admin' && userRef.data().access) {
                this.router.navigateByUrl('admin');
                this.userStatusChanges.next('admin');
              }
              else if (userRef.data().role == 'user') {
                this.router.navigateByUrl('profile');
                this.userStatusChanges.next('user');
              }
            });
          }
        );
      })
      .catch(err => {
        console.log(err);
        this.checkInvalid();
      });
  }

  signOut(): void {
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('userID');
        this.router.navigateByUrl('/home');
        this.userStatusChanges.next('logout');
      })
      .catch(err => console.log(err));
  }

  signUp(email: string, password: string, firstName: string, lastName: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        const user = {
          id: userResponse.user.uid,
          email: userResponse.user.email,
          role: 'user',
          firstName: firstName,
          lastName: lastName
        };
        this.firestore.collection('users').add(user)
          .then(data => {
            data.get()
              .then(user => {
                localStorage.setItem('user', JSON.stringify(user.data()))
                localStorage.setItem('userID', JSON.stringify(user.id));
                this.router.navigateByUrl('profile')
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  updateUserData(userData): Promise<void> {
    let docID = JSON.parse(localStorage.getItem('userID'));
    return this.firestore.collection('users').doc(docID).update(userData)
    .then(() => localStorage.setItem('user', JSON.stringify(userData)))
    .catch(err => console.log(err));
  }

  getUserBday(userBday: string): number {
    const currentYear = new Date().getFullYear();
    const bDay = new Date(userBday).getDate();
    const bMonth = new Date(userBday).getMonth();
    const birthday = Date.parse(`${currentYear}/${bMonth + 1}/${bDay}`);
    const currentDate = Date.parse(new Date().toString());
    let days = Math.floor((currentDate - birthday) / 86400000);
    return days;
  }



  checkInvalid(): void {
    let allInputs = document.querySelectorAll('.form-card-input');
    allInputs.forEach(element => {
      element.classList.remove('form-input-invalid');
    });
    let invalidInputs = document.querySelectorAll('.form-card-field .ng-invalid');
    invalidInputs.forEach(element => {
      element.classList.add('form-input-invalid')
    });
  }

}
