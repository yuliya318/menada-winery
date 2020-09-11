import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  modalRef: BsModalRef;
  adminCategories: Array<ICategory> = [];
  adminProducts: Array<IProduct> = [];

  editStatus = false;
  imageStatus = false;
  deleteProdID: string;

  prodID = '1';
  catID: string;
  catName: string;
  prodName: string;
  prodSort: string;
  prodVolume: string;
  prodPromille: string;
  prodVintage: number;
  prodOak: string;
  prodColor: string;
  prodAroma: string;
  prodTaste: string;
  prodTemp: string;
  prodPrice: number;
  prodImage: string;

  constructor(private modalService: BsModalService,
    private afStorage: AngularFireStorage,
    private categoryService: CategoryService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
  }

  private getCategories(): void {
    this.categoryService.getFirestoreCategories().subscribe(
      collection => {
        this.adminCategories = collection.map(category => {
          const data = category.payload.doc.data() as ICategory;
          const id = category.payload.doc.id;
          return { id, ...data };
        });
      }
    );
    // this.adminCategories = this.categoryService.getFirestoreCategories();

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
    // this.adminProducts = this.productService.getFirestoreProducts();
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `product-img/${name}.${type}`;
    const task = this.afStorage.upload(filePath, file);
    task.then(image => {
      this.afStorage.ref(`product-img/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.prodImage = url;
        this.imageStatus = true;
      });
    });
  }

  deleteImage(): void {
    this.prodImage = '';
    this.imageStatus = false;
  }

  setCategory(): void {
    this.catID = this.adminCategories.filter(cat => cat.name === this.catName.toLowerCase())[0].id;
  }

  createProduct(): IProduct {
    const newP = new Product(
      this.prodID,
      this.catID,
      this.catName.toLowerCase(),
      this.prodName,
      this.prodSort,
      this.prodVolume,
      this.prodPromille,
      +this.prodVintage,
      this.prodOak,
      this.prodColor,
      this.prodAroma,
      this.prodTaste,
      this.prodTemp,
      +this.prodPrice,
      this.prodImage
    )
    return newP;
  }

  addProduct(): void {
    let newProd = this.createProduct();
    delete newProd.id;
    this.productService.postFirestoreProduct({ ...newProd })
      .then(() => this.getProducts())
    this.resetForm();
  }

  editProduct(): void {
    let newProd = this.createProduct();
    this.productService.updateFirestoreProduct({ ...newProd })
      .then(() => this.getProducts());
    this.resetForm();
  }

  changeEditStatus(product: IProduct): void {
    this.editStatus = true;
    this.prodID = product.id;
    this.catID = product.catID;
    this.catName = product.catName;
    this.prodName = product.name;
    this.prodSort = product.sort;
    this.prodVolume = product.volume;
    this.prodPromille = product.promille;
    this.prodVintage = product.vintage;
    this.prodOak = product.oak;
    this.prodColor = product.color;
    this.prodAroma = product.aroma;
    this.prodTaste = product.taste;
    this.prodTemp = product.temp;
    this.prodPrice = product.price;
    this.prodImage = product.image;
    this.imageStatus = true;
  }

  deleteProduct(): void {
    this.productService.deleteFirestoreProduct(this.deleteProdID)
      .then(() => {
        this.getProducts();
        this.deleteProdID = '';
      })
  }

  private resetForm(): void {
    this.prodID = '';
    this.catID = '';
    this.catName = '';
    this.prodName = '';
    this.prodSort = '';
    this.prodVolume = '';
    this.prodPromille = '';
    this.prodVintage = 0;
    this.prodOak = '';
    this.prodColor = '';
    this.prodAroma = '';
    this.prodTaste = '';
    this.prodTemp = '';
    this.prodPrice = 0;
    this.prodImage = '';
    this.imageStatus = false;
    this.editStatus = false;
  }

}
