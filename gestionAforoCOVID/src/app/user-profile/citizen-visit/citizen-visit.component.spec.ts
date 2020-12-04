import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenVisitComponent } from './citizen-visit.component';

describe('CitizenVisitComponent', () => {
  let component: CitizenVisitComponent;
  let fixture: ComponentFixture<CitizenVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizenVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
