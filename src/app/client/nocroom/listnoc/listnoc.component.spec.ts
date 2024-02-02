import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListnocComponent } from './listnoc.component';

describe('ListnocComponent', () => {
  let component: ListnocComponent;
  let fixture: ComponentFixture<ListnocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListnocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListnocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
