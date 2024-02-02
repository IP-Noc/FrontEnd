import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepwdreqComponent } from './changepwdreq.component';

describe('ChangepwdreqComponent', () => {
  let component: ChangepwdreqComponent;
  let fixture: ComponentFixture<ChangepwdreqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangepwdreqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangepwdreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
