import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckAgeService {

  startVideo: Subject<any> = new Subject<any>();
  constructor(private router: Router) { }

  allowAccess(answer: boolean): void {
    if (answer) {
      localStorage.setItem('access', JSON.stringify('true'));
      this.router.navigateByUrl('home');
    }
  }
}
