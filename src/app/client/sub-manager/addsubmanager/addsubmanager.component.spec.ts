import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubmanagerComponent } from './addsubmanager.component';

describe('AddsubmanagerComponent', () => {
  let component: AddsubmanagerComponent;
  let fixture: ComponentFixture<AddsubmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsubmanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsubmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
