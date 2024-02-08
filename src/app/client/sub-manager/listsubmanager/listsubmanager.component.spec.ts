import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsubmanagerComponent } from './listsubmanager.component';

describe('ListsubmanagerComponent', () => {
  let component: ListsubmanagerComponent;
  let fixture: ComponentFixture<ListsubmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsubmanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsubmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
