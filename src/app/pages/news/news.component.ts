import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/shared/interfaces/news.interface';
import { NewsService } from 'src/app/shared/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

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
