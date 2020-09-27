import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInquiriesComponent } from './admin-inquiries.component';

describe('AdminInquiriesComponent', () => {
  let component: AdminInquiriesComponent;
  let fixture: ComponentFixture<AdminInquiriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInquiriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
