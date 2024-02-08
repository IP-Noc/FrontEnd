import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnocComponent } from './editnoc.component';

describe('EditnocComponent', () => {
  let component: EditnocComponent;
  let fixture: ComponentFixture<EditnocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditnocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditnocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
