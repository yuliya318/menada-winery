import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  orderStatus = false;

  constructor(private firestore: AngularFirestore,
    private orderService: OrderService,
    private actRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const prodName = this.actRoute.snapshot.paramMap.get('name');
        this.getProdDetails(prodName);
        this.setOrderStatus(prodName);
      }
    });
  }

  ngOnInit(): void {
    // this.checkProduct();
    // this.setOrderStatus();
  }

  getProdDetails(prodName: string): void {
    this.firestore.collection('products').ref.where('name', '==', prodName).onSnapshot(
      snap => {
        snap.forEach(prodData => {
          const data = prodData.data() as IProduct;
          const id = prodData.id;
          this.product = ({ id, ...data });
        });
      }
    );
  }

  addBasket(): void{
    this.orderService.addBasket(this.product);
    this.orderService.basket.next('check');
    this.setOrderStatus(this.product.name);
  }

  // private checkProduct(): void {
  //   this.orderService.basket.subscribe(
  //     () => {
  //       this.setOrderStatus(this.product.name);
  //     }
  //   );
  // }
  setOrderStatus(name: string): void {
    if (localStorage.length > 0 && localStorage.getItem('order')) {      
      let localOrder = JSON.parse(localStorage.getItem('order'));
      if (localOrder.some(prod => prod.name === name)) {
        this.orderStatus = true;
      }
    }
  }

}
