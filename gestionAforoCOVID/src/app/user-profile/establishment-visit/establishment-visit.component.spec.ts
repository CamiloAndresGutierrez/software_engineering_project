import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentVisitComponent } from './establishment-visit.component';

describe('EstablishmentVisitComponent', () => {
  let component: EstablishmentVisitComponent;
  let fixture: ComponentFixture<EstablishmentVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishmentVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
