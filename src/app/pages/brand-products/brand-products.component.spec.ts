import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandProductsComponent } from './brand-products.component';

describe('BrandProductsComponent', () => {
  let component: BrandProductsComponent;
  let fixture: ComponentFixture<BrandProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
