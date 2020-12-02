import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRegistrationComponent } from './check-registration.component';

describe('CheckRegistrationComponent', () => {
  let component: CheckRegistrationComponent;
  let fixture: ComponentFixture<CheckRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
