import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOptionsLoginComponent } from './user-options-login.component';

describe('UserOptionsLoginComponent', () => {
  let component: UserOptionsLoginComponent;
  let fixture: ComponentFixture<UserOptionsLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOptionsLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOptionsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
