import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Order } from 'src/app/shared/models/order.model';
import { IOrder } from '../../shared/interfaces/order.interface';
import { OrderService } from '../../shared/services/order.service';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  adminOrders: Array<IOrder> = [];
  adminProducts: Array<IProduct> = [];
  editStatus = false;
  searchString: string;

  orderID: string;
  userName: string;
  userPhone: string;
  userCountry: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  products: Array<IProduct>;
  totalSum: number;
  date: Date;
  status: string;
  discount = 0;
  comments?: string;

  promoStatus = false;

  constructor(private modalService: BsModalService,
    private orderService: OrderService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.getOrders();
    this.getProducts();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  private getOrders(): void {
    this.orderService.getFirestoreOrders().subscribe(
      collection => {
        this.adminOrders = collection.map(document => {
          const data = document.payload.doc.data() as IOrder;
          const id = document.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  private getProducts(): void {
    this.productService.getFirestoreProducts().subscribe(
      collection => {
        this.adminProducts = collection.map(product => {
          const data = product.payload.doc.data() as IProduct;
          const id = product.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  changeEditStatus(order: IOrder): void {
    this.editStatus = true;
    this.orderID = order.id;
    this.userName = order.userName;
    this.userPhone = order.userPhone;
    this.userCountry = order.userCountry;
    this.userCity = order.userCity;
    this.userStreet = order.userStreet;
    this.userHouse = order.userHouse;
    this.products = order.products;
    this.totalSum = order.totalSum;
    this.date = order.date;
    this.status = order.status;
    this.discount = order.discount;
    this.comments = order.comments;
    if (this.discount !== 0) this.promoStatus = true;
  }

  addProduct(product: IProduct): void {
    this.products.push(product);
    this.searchString = '';
    this.getTotal();
  }

  deleteProduct(product: IProduct): void {
    const index = this.products.findIndex(prod => prod.id === product.id);
    this.products.splice(index, 1);
    this.getTotal();
  }

  createOrder(): IOrder {
    const newOrder = new Order(
      this.orderID,
      this.userName,
      this.userPhone,
      this.userCountry,
      this.userCity,
      this.userStreet,
      this.userHouse,
      this.products,
      this.totalSum,
      this.date,
      this.status,
      this.discount,
      this.comments
    );
    return newOrder;
  }

  addOrder(): void {
    let order = this.createOrder();
    delete order.id;
    order.date = new Date();
    this.orderService.postFirestoreOrder({ ...order })
      .then(() => {
        this.getOrders();
        this.resetForm();
      }) 
  }

  editOrder(): void {
    const order = this.createOrder();
    this.orderService.updateFirestoreOrder({ ...order })
      .then(() => {
        this.getOrders();
        this.resetForm();
      })
  }

  resetForm(): void {
    this.orderID = '';
    this.userName = '';
    this.userPhone = '';
    this.userCountry = '';
    this.userCity = '';
    this.userStreet = '';
    this.userHouse = '';
    this.products = [];
    this.totalSum = 0;
    this.date = new Date;
    this.status = '';
    this.discount = 0;
    this.comments = '';
    this.editStatus = false;
    this.getOrders();
  }

  private getTotal(): void {
    this.totalSum = this.orderService.getTotalSum(this.products);
    if (this.promoStatus) {
      this.discount = Math.round(this.totalSum * 0.2);
      this.totalSum = Math.floor(this.totalSum * 0.8);
    }
  }

  productCount(product: IProduct, status: boolean): void {
    if (status) {
      product.count++;
    }
    else{
      if (product.count > 1) {
        product.count--;
      }
    }
    const index = this.products.findIndex(prod => prod.id === product.id);
    this.products[index].count = product.count;
    this.getTotal();
  }









}
