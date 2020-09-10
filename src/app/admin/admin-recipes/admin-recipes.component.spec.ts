import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecipesComponent } from './admin-recipes.component';

describe('AdminRecipesComponent', () => {
  let component: AdminRecipesComponent;
  let fixture: ComponentFixture<AdminRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
