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
      this.checkInvalid();
    }
    else {
      this.authService.signIn(this.uEmail, this.uPassword);
      this.resetForm();
    }
  }

  signUpUser(form: NgForm): void {
    if (form.invalid) {
      this.checkInvalid();
    }
    else {
      this.authService.signUp(this.uEmail, this.uPassword, this.uFirstName, this.uLastName);
      this.resetForm();
    }
  }

  checkInvalid(): void {
    let allInputs = document.querySelectorAll('.form-card-input');
    allInputs.forEach(element => {
      element.classList.remove('form-input-invalid');
    });
    let invalidInputs = document.querySelectorAll('.form-card-field .ng-invalid');
    invalidInputs.forEach(element => {
      element.classList.add('form-input-invalid')
    });
  }
  
  

  resetForm(): void {
    this.uEmail = '';
    this.uPassword = '';
    this.uFirstName = '';
    this.uLastName = '';
    this.enterStatus = true;
  }


}
