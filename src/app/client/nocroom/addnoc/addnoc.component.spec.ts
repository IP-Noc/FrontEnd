import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnocComponent } from './addnoc.component';

describe('AddnocComponent', () => {
  let component: AddnocComponent;
  let fixture: ComponentFixture<AddnocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
