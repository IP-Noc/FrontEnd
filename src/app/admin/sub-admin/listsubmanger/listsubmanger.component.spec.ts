import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsubmangerComponent } from './listsubmanger.component';

describe('ListsubmangerComponent', () => {
  let component: ListsubmangerComponent;
  let fixture: ComponentFixture<ListsubmangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsubmangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsubmangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
