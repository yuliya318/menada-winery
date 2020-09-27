import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { INews } from '../../shared/interfaces/news.interface';
import { News } from '../../shared/models/news.model';
import { NewsService } from '../../shared/services/news.service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  adminNews: Array<INews> = [];

  editStatus = false;
  imageStatus = false;
  deleteNewsID: string;

  newsID = '1';
  newsAnnot: string;
  newsTitle: string;
  newsText: string;
  newsImage: string;

  constructor(private modalService: BsModalService,
              private afStorage: AngularFireStorage,
              private newsService: NewsService) { }

  ngOnInit(): void {
    this.getNews();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }


  private getNews(): void {
    this.newsService.getFirestoreNews().subscribe(
      collection => {
        this.adminNews = collection.map(document => {
          const data = document.payload.doc.data() as INews;
          const id = document.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `news-img/${name}.${type}`;
    const task = this.afStorage.upload(filePath, file);
    task.then(image => {
      this.afStorage.ref(`news-img/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.newsImage = url;
        this.imageStatus = true;
      });
    });
  }

  deleteImage(): void {
    this.newsImage = '';
    this.imageStatus = false;
  }

  createNews(): INews {
    const date = new Date();
    const newArticle = new News (
      this.newsID,
      date,
      this.newsAnnot,
      this.newsTitle,
      this.newsText,
      this.newsImage,
    );
    return newArticle;
  }

  addNews(): void {
    const newArticle = this.createNews();
    delete newArticle.id;
    this.newsService.postFirestoreNews({ ...newArticle })
      .then(() => this.getNews())
    this.resetForm();
  }

  editNews(): void {
    const newArticle = this.createNews();
    this.newsService.updateFirestoreNews({ ...newArticle })
      .then(() => this.getNews());
    this.resetForm();
  }

  changeEditStatus(news: INews): void {
    this.editStatus = true;
    this.newsID = news.id;
    this.newsAnnot = news.annotation;
    this.newsTitle = news.title;
    this.newsText = news.text;
    this.newsImage = news.image;
    this.imageStatus = true;
  }

  deleteNews(): void {
    this.newsService.deleteFirestoreNews(this.deleteNewsID)
      .then(() => {
        this.getNews();
        this.deleteNewsID = '';
      })
  }

  private resetForm(): void {
    this.newsID = '1';
    this.newsAnnot = '';
    this.newsTitle = '';
    this.newsText = '';
    this.newsImage = '';
    this.imageStatus = false;
    this.editStatus = false;
  }

}
