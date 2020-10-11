import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryService } from '../../shared/services/category.service';
import { ICategory } from '../../shared/interfaces/category.interface';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  modalRef: BsModalRef;
  adminCategories: Array<ICategory> = [];

  editStatus = false;
  logoStatus = false;
  bgStatus = false;

  categoryID = '1';
  categoryName: string;
  categoryLogo: string;
  categoryBg: string;
  categoryDescr: string;

  constructor(private modalService: BsModalService,
    private afStorage: AngularFireStorage,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
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
  }


  uploadFile(event, imageVar: boolean): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `category-img/${name}.${type}`;
    const task = this.afStorage.upload(filePath, file);
    task.then(image => {
      this.afStorage.ref(`category-img/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        imageVar ? this.categoryLogo = url : this.categoryBg = url;
        imageVar ? this.logoStatus = true : this.bgStatus = true;
      });
    });
  }

  deleteImage(imageVar: boolean): void {
    imageVar ? this.categoryLogo = '' : this.categoryBg = '';
    imageVar ? this.logoStatus = false : this.bgStatus = false;
  }

  addEditCategory(): void {
    const newC = new Category(this.categoryID,
      this.categoryName.toLowerCase(), this.categoryLogo,  
      this.categoryBg, this.categoryDescr);
    if (!this.editStatus) {
      delete newC.id;
      this.categoryService.postFirestoreCategory({ ...newC })
        .then(() => this.getCategories())
    } else {
      this.categoryService.updateFirestoreCategory({ ...newC })
        .then(() => this.getCategories());
      this.editStatus = false;
    }
    this.resetForm();
  }


  changeEditStatus(category: ICategory): void {
    this.editStatus = true;
    this.categoryID = category.id;
    this.categoryName = category.name;
    this.categoryLogo = category.logo;
    this.categoryBg = category.bg;
    this.categoryDescr = category.description;
    this.logoStatus = true;
    this.bgStatus = true;
  }


  private resetForm(): void {
    this.categoryID = '1';
    this.categoryName = '';
    this.categoryLogo = '';
    this.categoryBg = '';
    this.categoryDescr = '';
    this.logoStatus = false;
    this.bgStatus = false;
  }
}
