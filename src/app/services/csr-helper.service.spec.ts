import { TestBed } from '@angular/core/testing';

import { CsrHelperService } from './csr-helper.service';

describe('CsrHelperService', () => {
  let service: CsrHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsrHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
