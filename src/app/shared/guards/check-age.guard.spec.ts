import { TestBed } from '@angular/core/testing';

import { CheckAgeGuard } from './check-age.guard';

describe('CheckAgeGuard', () => {
  let guard: CheckAgeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckAgeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
