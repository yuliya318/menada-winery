import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;

  constructor(private firestore: AngularFirestore,
    private actRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const prodName = this.actRoute.snapshot.paramMap.get('name');
        this.getProdDetails(prodName);
      }
    });
  }

  ngOnInit(): void {
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

}
