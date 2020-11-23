import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOptionsRegistrationComponent } from './user-options-registration.component';

describe('UserOptionsRegistrationComponent', () => {
  let component: UserOptionsRegistrationComponent;
  let fixture: ComponentFixture<UserOptionsRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOptionsRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOptionsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
