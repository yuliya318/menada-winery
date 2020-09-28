import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckAgeGuard implements CanActivate {

  constructor(private router: Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAge();
  }
  
  checkAge(): boolean {
    const access = JSON.parse(localStorage.getItem('access'));
    
    if (access != null && access === true){
      return true;
    }
    else{
      this.router.navigateByUrl('check-age');
      return false;
    }
  }
}