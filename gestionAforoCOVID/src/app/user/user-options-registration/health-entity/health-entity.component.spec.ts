import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthEntityComponent } from './health-entity.component';

describe('HealthEntityComponent', () => {
  let component: HealthEntityComponent;
  let fixture: ComponentFixture<HealthEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
