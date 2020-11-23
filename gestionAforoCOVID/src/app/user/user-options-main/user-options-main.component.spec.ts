import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOptionsMainComponent } from './user-options-main.component';

describe('UserOptionsMainComponent', () => {
  let component: UserOptionsMainComponent;
  let fixture: ComponentFixture<UserOptionsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOptionsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOptionsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
