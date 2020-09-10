import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAgeComponent } from './check-age.component';

describe('CheckAgeComponent', () => {
  let component: CheckAgeComponent;
  let fixture: ComponentFixture<CheckAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
