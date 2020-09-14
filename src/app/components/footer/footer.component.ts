import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../shared/services/news.service';
import { INews } from '../../shared/interfaces/news.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  news: Array<INews> = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getNews();
  }

  private getNews(): void {
    this.newsService.getFirestoreNews().subscribe(
      collection => {
        this.news = collection.map(document => {
          const data = document.payload.doc.data() as INews;
          const id = document.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

}
