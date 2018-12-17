import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockDataFormComponent } from './mock-data-form.component';

describe('MockDataFormComponent', () => {
  let component: MockDataFormComponent;
  let fixture: ComponentFixture<MockDataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockDataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
