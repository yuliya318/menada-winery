import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUser } from '../../shared/interfaces/user.interface';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData: IUser;
  userPhone: boolean;
  userBday: boolean;
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

  updateUserData(): void {
    this.authService.updateUserData({ ...this.userData })
      .then(() => {
        this.getUserData();
        this.editStatus = false;
      })
  }

  signOut(): void {
    this.authService.signOut();
  }


  changeEditStatus(): void {
    this.editStatus = true;
    this.userPhone = true;
    this.userBday = true;
  }

  showDetails(ind: number): void {
    document.querySelectorAll('.order-item')[ind].lastElementChild.classList.toggle('details-active');
  }

  // ordersCount(array: Array<IOrder>): Array<IOrder> {
  //   let newArr = array.filter(elem => {
  //     for (let key in elem) {
  //       // const value = String(elem[key]).toLowerCase();
  //       // if (key != 'image') {
  //         if (elem[key].includes(request)) return true
  //       // }
  //     }
  //     return false;
  //   });
  //   return newArr;
  // }
}
