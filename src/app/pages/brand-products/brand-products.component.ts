import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ICategory } from '../../shared/interfaces/category.interface';
import { element } from 'protractor';

enum WineTypes { Red, White, Rosé };


@Component({
  selector: 'app-brand-products',
  templateUrl: './brand-products.component.html',
  styleUrls: ['./brand-products.component.scss']
})
export class BrandProductsComponent implements OnInit {

  catProducts: Array<IProduct> = [];
  categoryName: string;
  category: ICategory;

  wineTypes = WineTypes;

  constructor(private firestore: AngularFirestore,
    private actRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.categoryName = this.actRoute.snapshot.paramMap.get('category');
        // this.getCatProducts(this.categoryName);
        this.test(this.categoryName);
        this.getCategoryInfo();
      }
    });
  }

  ngOnInit(): void {
    this.getCategoryInfo();
  }

  getCatProducts(categoryName: string): void {
    this.catProducts = [];
    this.firestore.collection('products').ref.where('catName', '==', categoryName).onSnapshot(
      snap => {
        snap.forEach(prodData => {
          const data = prodData.data() as IProduct;
          const id = prodData.id;
          this.catProducts.push({ id, ...data });
        });
      }
    );
  }

  test(categoryName: string): void {
    this.catProducts = [];
    this.firestore.collection('products').snapshotChanges().subscribe(
      collection => {
        let products = collection.map( prod => {
          const data = prod.payload.doc.data() as IProduct;
          const id = prod.payload.doc.id;
          return { id, ...data };
        });
        this.catProducts = products.filter( elem => {
          if (elem.catName === categoryName) return true;
          return false;
        })
      }
    )
    // this.categoryService.getFirestoreCategories().subscribe(
    //   collection => {
    //     this.adminCategories = collection.map(category => {
    //       const data = category.payload.doc.data() as ICategory;
    //       const id = category.payload.doc.id;
    //       return { id, ...data };
    //     });
    //   }
    // );
  }

  getCategoryInfo(): void {
    this.firestore.collection('categories').ref.where('name', '==', this.categoryName).onSnapshot(
      snap => {
        snap.forEach(document => {
          const data = document.data() as ICategory;
          const id = document.id;
          this.category = ({ id, ...data });
        });
      }
    );
  }

  
  changeActiveStatus(sort: string): void {
    let products = document.getElementsByClassName('product-content');
    this.catProducts.forEach( (element, index) => {
      if (element.sort === sort) {
      products[index].classList.toggle('product-active-border');
      }
    });
    document.getElementsByClassName('filter-btn')[this.wineTypes[sort]].classList.toggle('product-active-border');
  }

}
