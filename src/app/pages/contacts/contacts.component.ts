import { Component, OnInit } from '@angular/core';
import { InquiryService } from '../../shared/services/inquiry.service';
import { IInquiry } from '../../shared/interfaces/inquiry.interface';
import { Inquiry } from '../../shared/models/inquiry.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  inqID: string = '';
  inqName: string;
  inqPhone: string;
  inqEmail: string;
  inqMessage: string;
  inqStatus: string;
  inqComments: string = '';

  constructor(private inquiryService: InquiryService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  private getUserDetails(): void {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.inqName = user.firstName;
      this.inqEmail = user.email;
      user.phone ? this.inqPhone = user.phone : this.inqPhone = '';
    }
  }

  createInquiry(): IInquiry {
    const date = new Date();
    const newInquiry = new Inquiry (
      this.inqID,
      date,
      this.inqName,
      this.inqPhone,
      this.inqEmail,
      this.inqMessage,
      this.inqStatus,
      this.inqComments
    );
    return newInquiry;
  }

  addInquiry(form: NgForm): void {
    if (form.invalid) {
      this.authService.checkInvalid();
    }
    else {
      let newInquiry = this.createInquiry();
      delete newInquiry.id;
      this.inquiryService.postFirestoreInquiry({ ...newInquiry })
        .then(() => {
          document.querySelector('.confirm-btn').classList.add('hidden');
          document.querySelector('.success-text').classList.remove('hidden');
          this.resetForm();
        })
    }
    
  }

  changeFocus(index: number): void {
    document.getElementsByClassName('form-card-label-text')[index].classList.toggle('form-focus-color');
  }

  private resetForm(): void {
    this.inqID = '1';
    this.inqName = '';
    this.inqPhone = '';
    this.inqEmail = '';
    this.inqMessage = '';
  }

}
