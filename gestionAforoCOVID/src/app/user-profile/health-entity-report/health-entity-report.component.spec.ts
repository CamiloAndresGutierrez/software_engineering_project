import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthEntityReportComponent } from './health-entity-report.component';

describe('HealthEntityReportComponent', () => {
  let component: HealthEntityReportComponent;
  let fixture: ComponentFixture<HealthEntityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthEntityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthEntityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
