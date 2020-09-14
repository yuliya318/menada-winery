import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuActive = false;
  categories: Array<ICategory> = [];

  loginedStatus = false;
  urlName: string;
  menuName: string;

  constructor(private categoryService: CategoryService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getCategories();
    this.setUserStatus();
    this.checkUser();
  }

  menuActivate(): void {
    this.menuActive = !this.menuActive;
    if (this.menuActive) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = 'auto';
  }
  closeMenu(): void {
    this.menuActive = false;
    document.body.style.overflowY = 'auto';
  }

  private getCategories(): void {
    this.categoryService.getFirestoreCategories().subscribe(
      collection => {
        this.categories = collection.map(category => {
          const data = category.payload.doc.data() as ICategory;
          const id = category.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }


  private setUserStatus(): void {
    this.authService.userStatusChanges.subscribe(
      () => {
        this.checkUser();
      }
    );
  }

  private checkUser(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      if (user.role === 'admin') {
        this.urlName = 'admin';
        this.menuName = 'admin';
        this.loginedStatus = true;
      }
      else if (user.role === 'user') {
        this.urlName = 'profile';
        this.menuName = 'cabinet';
        this.loginedStatus = true;
      }
    }
    else {
      this.loginedStatus = false;
      this.urlName = '';
      this.menuName = '';
    }
  }





















}

