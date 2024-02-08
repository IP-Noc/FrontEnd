import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckpwdComponent } from './checkpwd.component';

describe('CheckpwdComponent', () => {
  let component: CheckpwdComponent;
  let fixture: ComponentFixture<CheckpwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckpwdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
