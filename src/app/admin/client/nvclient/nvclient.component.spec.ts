import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvclientComponent } from './nvclient.component';

describe('NvclientComponent', () => {
  let component: NvclientComponent;
  let fixture: ComponentFixture<NvclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NvclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NvclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
