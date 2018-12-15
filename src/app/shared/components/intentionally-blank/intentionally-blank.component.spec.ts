import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentionallyBlankComponent } from './intentionally-blank.component';

describe('IntentionallyBlankComponent', () => {
  let component: IntentionallyBlankComponent;
  let fixture: ComponentFixture<IntentionallyBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentionallyBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentionallyBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
