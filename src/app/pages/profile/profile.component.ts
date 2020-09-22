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

  userData: IUser;
  userPhone: boolean;
  userBday: boolean;
  userCountry: boolean;
  userCity: boolean;
  userStreet: boolean;
  userHouse: boolean;
  editStatus = false;
  userName: string;
  userOrders: Array<IOrder> = [];

  constructor(private authService: AuthService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.getUserData();
    this.getOrders();
  }

  getUserData(): void {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      this.userData = JSON.parse(localStorage.getItem('user'));
      this.userName = this.userData.firstName;
      this.userData.phone ? this.userPhone = true : this.userPhone = false;
      this.userData.birthday ? this.userBday = true : this.userBday = false;
      this.userData.country ? this.userCountry = true : this.userCountry = false;
      this.userData.city ? this.userCity = true : this.userCity = false;
      this.userData.street ? this.userStreet = true : this.userStreet = false;
      this.userData.house ? this.userHouse = true : this.userHouse = false;
    }
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
