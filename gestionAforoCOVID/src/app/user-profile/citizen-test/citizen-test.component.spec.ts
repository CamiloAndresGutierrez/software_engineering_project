import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenTestComponent } from './citizen-test.component';

describe('CitizenTestComponent', () => {
  let component: CitizenTestComponent;
  let fixture: ComponentFixture<CitizenTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizenTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
