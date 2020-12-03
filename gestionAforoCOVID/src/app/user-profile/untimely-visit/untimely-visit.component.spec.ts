import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UntimelyVisitComponent } from './untimely-visit.component';

describe('UntimelyVisitComponent', () => {
  let component: UntimelyVisitComponent;
  let fixture: ComponentFixture<UntimelyVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UntimelyVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UntimelyVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
