import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { IOrder } from '../../shared/interfaces/order.interface';
import { IProduct } from '../../shared/interfaces/product.interface';
import { Order } from '../../shared/models/order.model';
import { IUser } from '../../shared/interfaces/user.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  orderProducts: Array<IProduct> = [];
  totalSum: number = 0;

  userData: IUser;
  orderID = '1';
  userName: string;
  userPhone: string;
  userCountry: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  date: Date;
  status: string;
  comments: string;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getBasket();
    this.getUserDetails();
  }

  private getBasket(): void {
    this.orderProducts = this.orderService.getProdFromLocal();
    this.getTotal();
  }

  private getUserDetails(): void {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.userName = user.firstName;
      user.phone ? this.userPhone = user.phone : this.userPhone = '';
      user.country ? this.userCountry = user.country : this.userCountry = '';
      user.city ? this.userCity = user.city : this.userCity = '';
      user.street ? this.userStreet = user.street : this.userStreet = '';
      user.house ? this.userHouse = user.house : this.userHouse = '';
    }
  }

  private getTotal(): void {
    this.totalSum = this.orderService.getTotalSum(this.orderProducts);
  }

  productCount(product: IProduct, status: boolean): void {
    this.orderService.productCount(product, status);
    this.getBasket();
  }

  changeProdCount(product: IProduct): void {
    this.orderService.addBasket(product);
    this.getBasket();
  }

  deleteProduct(product: IProduct): void {
    this.orderService.deleteProduct(product);
    this.getBasket();
    if (this.orderProducts.length === 0) this.resetForm();
  }

  createOrder(): IOrder {
    const date = new Date();
    const newOrder = new Order(
      this.orderID,
      this.userName,
      this.userPhone,
      this.userCity,
      this.userStreet,
      this.userHouse,
      this.orderProducts,
      this.totalSum,
      date,
      this.status,
      this.comments
    );
    return newOrder;
  }

  addOrder(form: NgForm): void {
    if (form.invalid) {
      this.checkInvalid();
    }
    else {
      const order = this.createOrder();
      delete order.id;
      this.orderService.postFirestoreOrder({ ...order })
        .then(() => {
          this.getBasket();
          this.resetForm();
          document.body.style.overflowY = 'hidden';
          document.querySelector('.order-completed-container').classList.toggle('hidden');
          this.orderProducts = [];
        })
    }
  }

  checkInvalid(): void {
    let allInputs = document.querySelectorAll('.form-card-input');
    allInputs.forEach(element => {
      element.classList.remove('form-input-invalid')
    });
    let invalidInputs = document.querySelectorAll('.form-card-field .ng-invalid');
    invalidInputs.forEach(element => {
      element.classList.add('form-input-invalid')
    });
  }

  closeOrderModal(): void {
    document.querySelector('.order-completed-container').classList.toggle('hidden');
    document.body.style.overflowY = 'auto';
  }

  resetForm(): void {
    this.userName = '';
    this.userPhone = '';
    this.userCity = '';
    this.userStreet = '';
    this.userHouse = '';
    this.comments = '';
  }

  changeFocus(index: number): void {
    document.getElementsByClassName('form-card-label-text')[index].classList.toggle('form-focus-color');
  }
}
