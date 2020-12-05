import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthEntityProfileComponent } from './health-entity-profile.component';

describe('HealthEntityProfileComponent', () => {
  let component: HealthEntityProfileComponent;
  let fixture: ComponentFixture<HealthEntityProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthEntityProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthEntityProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
