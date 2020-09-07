import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Array<any> = [
    {
      name: 'Menada - Sauvignon Blanc',
      description: 'The wine from Traminer has crystal beautiful light color of straw. The aroma is strong of roses and ripe fruits. The taste is balanced, with pronounced softness and freshness.',
      source: '../../../assets/images/menada-bottle-s.png'
    },
    {
      name: 'Menada - Traminer',
      description: 'The wine from Traminer has crystal beautiful light color of straw. The aroma is strong of roses and ripe fruits. The taste is balanced, with pronounced softness and freshness.',
      source: '../../../assets/images/menada-bottle-t.png'
    },
    {
      name: 'Menada - Chardonnay',
      description: 'Our Chardonnay delights with its straw-like yellow color and soft green hues. The aroma is fine and fresh, with light pleasant accents. The taste has pronounced elegant freshness and finesse.',
      source: '../../../assets/images/menada-bottle-c.png'
    },
    {
      name: 'Menada - Muscat',
      description: 'The wine from Muscat is with bright yellow greenish color and discrete fresh and balanced taste.',
      source: '../../../assets/images/menada-bottle-m.png'
    },
    {
      name: 'Menada - Rosé',
      description: 'Our Rose charms with its vivid rose color. Its aroma is rich of ripe forest fruits, cherry and spicy herbs. The taste has pleasant freshness and long finish.',
      source: '../../../assets/images/menada-bottle-r.png'
    },
    {
      name: 'Menada - Cabernet Sauvignon',
      description: 'Cabernet Sauvignon is with dark ruby red color. The aroma is fruity with sweet accents of violets and raspberry jam, vanilla and spices. The taste is fresh with fuller body and lasting aftertaste.',
      source: '../../../assets/images/menada-bottle-c-red.png'
    },
    {
      name: 'Menada - Merlot',
      description: 'MENADA Merlot grabs the attention with its intense red color and balanced taste, with soft and velvety tannins. The taste is rich and manifold of raspberries, cherries, plums, chocolate, bay leaf and vanilla.',
      source: '../../../assets/images/menada-bottle-m-red.png'
    },
    {
      name: 'Menada - Mavrud',
      description: 'Mavrud is a variety that is a national heritage and pride. The wine is with intense ruby red color, rich and dense balanced taste, velvety tannins. The aroma is specific and pleasant of blackberries, ripe mulberries, plums and chocolate.',
      source: '../../../assets/images/menada-bottle-m-violet.png'
    }
  ];
  productName = '<span>A revolution in design.</span><br><span>Tradition in quality.</span>';
  productText = 'To be even closer to the people of today, the beloved to generation of Bulgarians MENADA, has stepped outside its boundaries to reappear in a whole new vision - bold, modern, distinguishable.';

  constructor() { }

  ngOnInit(): void {
    AOS.init({
      // offset: 200,
      duration: 1200,
      // easing: 'ease-in-sine',
      // delay: 100,
      disable: window.innerWidth < 1024,
      once: true
    });
  }

  check(): void {
    let video = document.getElementsByTagName('video');
    console.log('video', video);
    video[0].play();
    video[1].play();
    video[2].play();
    video[3].play();
    video[4].play();
  }

  changeProdInfo(prod: any): void {
    this.productName = prod.name;
    this.productText = prod.description;
  }

  setProdInfo(): void{
    this.productName = '<span>A revolution in design.</span><br><span>Tradition in quality.</span>';
    this.productText = 'To be even closer to the people of today, the beloved to generation of Bulgarians MENADA, has stepped outside its boundaries to reappear in a whole new vision - bold, modern, distinguishable.';
  }
}
