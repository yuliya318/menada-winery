import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IInquiry } from '../../shared/interfaces/inquiry.interface';
import { InquiryService } from '../../shared/services/inquiry.service';
import { Inquiry } from '../../shared/models/inquiry.model';

@Component({
  selector: 'app-admin-inquiries',
  templateUrl: './admin-inquiries.component.html',
  styleUrls: ['./admin-inquiries.component.scss']
})
export class AdminInquiriesComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  adminInquiries: Array<IInquiry> = [];
  editStatus = false;

  inqID: string = '';
  inqDate: Date;
  inqName: string;
  inqPhone: string;
  inqEmail: string;
  inqMessage: string;
  inqStatus: string = 'In processing';
  inqComments: string = '';


  constructor(private modalService: BsModalService,
              private inquiryService: InquiryService) { }

  ngOnInit(): void {
    this.getInquiries();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  private getInquiries(): void {
    this.inquiryService.getFirestoreInquiries().subscribe(
      collection => {
        this.adminInquiries = collection.map(document => {
          const data = document.payload.doc.data() as IInquiry;
          const id = document.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  createInquiry(): IInquiry {
    if (!this.editStatus) {
      this.inqDate = new Date();
    }
    const newInquiry = new Inquiry (
      this.inqID,
      this.inqDate,
      this.inqName,
      this.inqPhone,
      this.inqEmail,
      this.inqMessage,
      this.inqStatus,
      this.inqComments
    );
    return newInquiry;
  }

  addInquiry(): void {
    let newInquiry = this.createInquiry();
    delete newInquiry.id;
    newInquiry.message = newInquiry.message + ' .....//filled in by admin'; 
    this.inquiryService.postFirestoreInquiry({ ...newInquiry })
      .then(() => {
        this.getInquiries();
        this.resetForm();
      })
  }

  editInquiry(): void {
    const newInquiry = this.createInquiry();
    this.inquiryService.updateFirestoreInquiry({ ...newInquiry })
      .then(() => {
        this.getInquiries();
        this.resetForm();
      });
  }

  changeEditStatus(inq: IInquiry): void {
    this.editStatus = true;
    this.inqID = inq.id;
    this.inqDate = inq.date;
    this.inqName = inq.name;
    this.inqPhone = inq.phone;
    this.inqEmail = inq.email;
    this.inqMessage = inq.message;
    this.inqStatus = inq.status;
    inq.comments ? this.inqComments = inq.comments : this.inqComments = '';
  }

  private resetForm(): void {
    this.inqID = '1';
    this.inqDate = new Date;
    this.inqName = '';
    this.inqPhone = '';
    this.inqEmail = '';
    this.inqMessage = '';
    this.inqStatus = 'In processing';
    this.inqComments = '';
    this.editStatus = false;
  }

}
