import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockElementDynamicFormComponent } from './mock-element-dynamic-form.component';

describe('MockElementDynamicFormComponent', () => {
  let component: MockElementDynamicFormComponent;
  let fixture: ComponentFixture<MockElementDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockElementDynamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockElementDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
