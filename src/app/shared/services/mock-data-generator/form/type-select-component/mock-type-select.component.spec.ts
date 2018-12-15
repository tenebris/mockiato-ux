import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockTypeSelectComponent } from './mock-type-select.component';

describe('MockTypeSelectComponent', () => {
  let component: MockTypeSelectComponent;
  let fixture: ComponentFixture<MockTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
