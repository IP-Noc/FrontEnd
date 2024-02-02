import { TestBed } from '@angular/core/testing';

import { EmployeGuardGuard } from './employe-guard.guard';

describe('EmployeGuardGuard', () => {
  let guard: EmployeGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmployeGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
