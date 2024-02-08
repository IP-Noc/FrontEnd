import { TestBed } from '@angular/core/testing';
import { CompanyGuard } from './student.guard';


describe('StudentGuard', () => {
  let guard: CompanyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompanyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
