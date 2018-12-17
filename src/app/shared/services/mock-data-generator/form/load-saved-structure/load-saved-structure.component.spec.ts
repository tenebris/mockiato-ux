import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSavedStructureComponent } from './load-saved-structure.component';

describe('LoadSavedStructureComponent', () => {
  let component: LoadSavedStructureComponent;
  let fixture: ComponentFixture<LoadSavedStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadSavedStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadSavedStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
