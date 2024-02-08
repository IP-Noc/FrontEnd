import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqresetComponent } from './reqreset.component';

describe('ReqresetComponent', () => {
  let component: ReqresetComponent;
  let fixture: ComponentFixture<ReqresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqresetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
