import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentProfileComponent } from './establishment-profile.component';

describe('EstablishmentProfileComponent', () => {
  let component: EstablishmentProfileComponent;
  let fixture: ComponentFixture<EstablishmentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishmentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
