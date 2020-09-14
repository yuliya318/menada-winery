import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { CheckAgeService } from '../../shared/services/check-age.service';


@Component({
  selector: 'app-check-age',
  templateUrl: './check-age.component.html',
  styleUrls: ['./check-age.component.scss']
})
export class CheckAgeComponent implements OnInit {

  denay = false;
  constructor(private CheckAgeService: CheckAgeService) { }

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      delay: 200,
      disable: window.innerWidth < 1024,
      once: true
    });
  }

  checkAge(answer: boolean): void {
    if (answer) this.CheckAgeService.allowAccess(answer);
    else this.denay = true;
  }
}
