import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualVisitComponent } from './manual-visit.component';

describe('ManualVisitComponent', () => {
  let component: ManualVisitComponent;
  let fixture: ComponentFixture<ManualVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
