import { AdminOnlyGuard } from './admin-only.guard';
import { TestBed } from '@angular/core/testing';


describe('AdminOnlyGuard', () => {
  let guard: AdminOnlyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminOnlyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
