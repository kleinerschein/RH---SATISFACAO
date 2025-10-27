import { TestBed } from '@angular/core/testing';

import { EncurtadorUrlService } from './encurtador-url.service';

describe('EncurtadorUrlService', () => {
  let service: EncurtadorUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncurtadorUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
