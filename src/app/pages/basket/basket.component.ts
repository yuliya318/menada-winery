import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { IOrder } from '../../shared/interfaces/order.interface';
import { IProduct } from '../../shared/interfaces/product.interface';
import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  orderProducts: Array<IProduct> = [];
  totalSum: number;

  orderID = '1';
  userName: string;
  userPhone: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  date: Date;
  status: string;
  comments: string;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getBasket();
  }

  private getBasket(): void {
    this.orderProducts = this.orderService.getProdFromLocal();
    this.getTotal();
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
  }

  createOrder(): IOrder {
    const date = new Date();
    const newOrder = new Order (
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

  addOrder(): void {
    const order = this.createOrder();
    delete order.id;
    this.orderService.postFirestoreOrder({ ...order })
      .then( () => {
        this.getBasket();
        this.resetForm();
      })
  }

  resetForm(): void {
    this.userName = '';
    this.userPhone = '';
    this.userCity = '';
    this.userStreet = '';
    this.userHouse = '';
    this.comments = '';
  }
}
