import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowgraphsComponent } from './showgraphs.component';

describe('ShowgraphsComponent', () => {
  let component: ShowgraphsComponent;
  let fixture: ComponentFixture<ShowgraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowgraphsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowgraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
