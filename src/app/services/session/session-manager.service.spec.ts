import { TestBed } from '@angular/core/testing';

import { SessionManagerService } from './session-manager.service';

describe('SessionManangerService', () => {
  let service: SessionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
