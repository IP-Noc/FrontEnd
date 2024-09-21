import { TestBed } from '@angular/core/testing';

import { SharedStateServiceService } from './shared-state-service.service';

describe('SharedStateServiceService', () => {
  let service: SharedStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
