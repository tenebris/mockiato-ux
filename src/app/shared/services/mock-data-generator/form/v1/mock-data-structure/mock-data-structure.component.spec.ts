import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockDataStructureComponent } from './mock-data-structure.component';

describe('MockDataStructureComponent', () => {
  let component: MockDataStructureComponent;
  let fixture: ComponentFixture<MockDataStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockDataStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockDataStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
