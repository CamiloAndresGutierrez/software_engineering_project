import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HETestHistoryComponent } from './he-test-history.component';

describe('HETestHistoryComponent', () => {
  let component: HETestHistoryComponent;
  let fixture: ComponentFixture<HETestHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HETestHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HETestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
