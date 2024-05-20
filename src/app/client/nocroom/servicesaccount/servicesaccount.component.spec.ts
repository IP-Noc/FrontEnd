import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesaccountComponent } from './servicesaccount.component';

describe('ServicesaccountComponent', () => {
  let component: ServicesaccountComponent;
  let fixture: ComponentFixture<ServicesaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesaccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
