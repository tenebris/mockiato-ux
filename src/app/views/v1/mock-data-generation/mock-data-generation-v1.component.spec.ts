import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockDataGenerationV1Component } from './mock-data-generation-v1.component';

describe('MockDataGenerationV1Component', () => {
  let component: MockDataGenerationV1Component;
  let fixture: ComponentFixture<MockDataGenerationV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockDataGenerationV1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockDataGenerationV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
