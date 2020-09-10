import { TestBed } from '@angular/core/testing';

import { CheckAgeService } from './check-age.service';

describe('CheckAgeService', () => {
  let service: CheckAgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckAgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
