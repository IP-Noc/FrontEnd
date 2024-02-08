import { TestBed } from '@angular/core/testing';

import { InstituteGuard } from './institute.guard';

describe('InstituteGuard', () => {
  let guard: InstituteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InstituteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
