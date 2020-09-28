import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUser } from '../../shared/interfaces/user.interface';
import { OrderService } from '../../shared/services/order.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  searchString = '...';

  userData: IUser;
  userPhone = false;
  userBday: boolean;
  bDayConfirmed = false;
  userCountry: boolean;
  userCity: boolean;
  userStreet: boolean;
  userHouse: boolean;
  editStatus = false;
  userName: string;
  userOrders: Array<IOrder> = [];

  birthDay = false;
  bDaySoon = false;
  bDayAfter = false;
  promoStatus = false;

  constructor(private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.getUserData();
    this.getOrders();
  }


  getUserData(): void {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.userName = user.firstName;
      if (user.phone) {
        this.userPhone = true;
        this.searchString = user.phone;
      } 
      user.birthday ? this.userBday = true : this.userBday = false;
      user.country ? this.userCountry = true : this.userCountry = false;
      user.city ? this.userCity = true : this.userCity = false;
      user.street ? this.userStreet = true : this.userStreet = false;
      user.house ? this.userHouse = true : this.userHouse = false;
      if (user.bDayConfirmed) this.bDayConfirmed = true;
      this.userData = user;
      if (this.userData.birthday) this.getUserBday(this.userData.birthday);
    }
  }

  getUserBday(userBday: string): void {
    this.birthDay = false;
    this.bDaySoon = false;
    this.bDayAfter = false;
    this.promoStatus = false;
    let days = this.authService.getUserBday(userBday);
    if (days >= -3 && days < 0) this.bDaySoon = true;
    if (days <= 3 && days > 0) this.bDayAfter = true;
    if (days === 0) this.birthDay = true;
    if (days <= 3 && days >= -3) this.promoStatus = true;
  }

  private getOrders(): void {
    this.orderService.getFirestoreOrders().subscribe(
      collection => {
        this.userOrders = collection.map(document => {
          const data = document.payload.doc.data() as IOrder;
          const id = document.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  updateUserData(form: NgForm): void {
    if (form.invalid) {
      this.checkInvalid();
    }
    else {
      this.authService.updateUserData({ ...this.userData })
        .then(() => {
          this.getUserData();
          this.editStatus = false;
          this.removeInvalid();
        })
    }
  }

  checkInvalid(): void {
    this.removeInvalid();
    let invalidInputs = document.querySelectorAll('.form-card-field .ng-invalid');
    invalidInputs.forEach(element => {
      element.classList.add('form-input-invalid')
    });
  }
  removeInvalid(): void {
    let allInputs = document.querySelectorAll('.form-card-input');
    allInputs.forEach(element => {
      element.classList.remove('form-input-invalid');
    });
  }


  signOut(): void {
    this.authService.signOut();
  }


  changeEditStatus(): void {
    this.editStatus = true;
    this.userPhone = true;
    this.userBday = true;
    this.userCountry = true;
    this.userCity = true;
    this.userStreet = true;
    this.userHouse = true;
  }

  showDetails(ind: number): void {
    document.querySelectorAll('.order-item')[ind].lastElementChild.classList.toggle('details-active');
  }

}
