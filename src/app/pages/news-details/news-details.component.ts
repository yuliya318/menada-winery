import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { INews } from '../../shared/interfaces/news.interface';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {

  article: INews;
  artParagraphs: Array<string>;

  constructor(private firestore: AngularFirestore,
    private actRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const newsName = this.actRoute.snapshot.paramMap.get('name');
        this.getArticleDetails(newsName);
      }
    });
  }

  ngOnInit(): void {
  }

  getArticleDetails(newsName: string): void {
    this.firestore.collection('news').ref.where('title', '==', newsName).onSnapshot(
      snap => {
        snap.forEach(document => {
          const data = document.data() as INews;
          const id = document.id;
          this.article = ({ id, ...data });
          this.artParagraphs = data.text.split('*/');
        });
      }
    );
  }

}
