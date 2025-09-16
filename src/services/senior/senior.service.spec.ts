import { TestBed } from '@angular/core/testing';

import { SeniorService } from './senior.service';

describe('SeniorService', () => {
  let service: SeniorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeniorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
