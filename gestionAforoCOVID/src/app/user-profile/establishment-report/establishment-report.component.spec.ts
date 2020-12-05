import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentReportComponent } from './establishment-report.component';

describe('EstablishmentReportComponent', () => {
  let component: EstablishmentReportComponent;
  let fixture: ComponentFixture<EstablishmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
