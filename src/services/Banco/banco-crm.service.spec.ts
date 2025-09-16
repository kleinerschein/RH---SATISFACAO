import { TestBed } from '@angular/core/testing';

import { BancoCRMService } from './banco.service';

describe('BancoCRMService', () => {
  let service: BancoCRMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancoCRMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
