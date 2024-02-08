import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubmangerComponent } from './addsubmanger.component';

describe('AddsubmangerComponent', () => {
  let component: AddsubmangerComponent;
  let fixture: ComponentFixture<AddsubmangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsubmangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsubmangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
