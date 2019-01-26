import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockGroupV1Component } from './mock-group-v1.component';

describe('MockGroupV1Component', () => {
  let component: MockGroupV1Component;
  let fixture: ComponentFixture<MockGroupV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockGroupV1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockGroupV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
