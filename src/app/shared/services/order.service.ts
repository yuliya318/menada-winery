import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { IOrder } from '../interfaces/order.interface';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  localProducts: Array<IProduct> = [];
  basket: Subject<any> = new Subject<any>();
  constructor(private firestore: AngularFirestore) { }

  productCount(product: IProduct, status: boolean): void {
    if (status) {
      product.count++;
    }
    else{
      if (product.count > 1) {
        product.count--;
      }
    }
    this.addBasket(product);
  }



  addBasket(product: IProduct): void {
    if (localStorage.length > 0 && localStorage.getItem('order')) {
      this.localProducts = JSON.parse(localStorage.getItem('order'));
      if (this.localProducts.some(prod => prod.id === product.id)){
        const index = this.localProducts.findIndex(prod => prod.id === product.id);
        this.localProducts[index].count = product.count;
      }
      else {
        this.localProducts.push(product);
      }
    }
    else {
      this.localProducts.push(product);
    }
    localStorage.setItem('order', JSON.stringify(this.localProducts));
    this.basket.next('check');
    product.count = 1;
  }


  getProdFromLocal(): Array<IProduct> {
    if (localStorage.length > 0 && localStorage.getItem('order')) {
      let prodArr = JSON.parse(localStorage.getItem('order'));
      return prodArr;
    }
    else {
      return []
    }
  }

  getTotalSum(prodArr: Array<IProduct>): number {
    if (prodArr){
      return prodArr.reduce((total, prod) => {
        return total + (prod.price * prod.count);
      }, 0);
    }
    else return 0;
  }

  deleteProduct(product: IProduct): void {
    const index = this.localProducts.findIndex(prod => prod.id === product.id);
    this.localProducts.splice(index, 1);
    if (this.localProducts.length === 0) {
      localStorage.removeItem('order');
    } 
    else localStorage.setItem('order', JSON.stringify(this.localProducts));
    this.basket.next('check');
  }

  getFirestoreOrders(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('orders').snapshotChanges()
  }

  postFirestoreOrder(order: IOrder): Promise<DocumentReference>{
    localStorage.removeItem('order');
    this.localProducts = [];
    this.basket.next('check');
    return this.firestore.collection('orders').add(order);
  }

  updateFirestoreOrder(order: IOrder): Promise<void> {
    return this.firestore.collection('orders').doc(order.id).update(order);
  }
 
}
