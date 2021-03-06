import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  enterStatus = true;

  uEmail: string;
  uPassword: string;
  uFirstName: string;
  uLastName: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  changeFocus(index: number): void {
    document.getElementsByClassName('form-card-label-text')[index].classList.toggle('form-focus-color');
  }

  changeEnterStatus(): void {
    this.enterStatus = !this.enterStatus;
  }

  signInUser(form: NgForm): void {
    if (form.invalid) {
      this.authService.checkInvalid();
    }
    else {
      this.authService.signIn(this.uEmail, this.uPassword);
      this.resetForm();
    }
  }

  signUpUser(form: NgForm): void {
    if (form.invalid) {
      this.authService.checkInvalid();
    }
    else {
      this.authService.signUp(this.uEmail, this.uPassword, this.uFirstName, this.uLastName);
      this.resetForm();
    }
  }

  resetForm(): void {
    this.uEmail = '';
    this.uPassword = '';
    this.uFirstName = '';
    this.uLastName = '';
    this.enterStatus = true;
  }


}
