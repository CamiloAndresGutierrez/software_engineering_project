import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenQrGenerationComponent } from './citizen-qr-generation.component';

describe('CitizenQrGenerationComponent', () => {
  let component: CitizenQrGenerationComponent;
  let fixture: ComponentFixture<CitizenQrGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizenQrGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenQrGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
