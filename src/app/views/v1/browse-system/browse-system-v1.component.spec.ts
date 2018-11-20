import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseSystemV1Component } from './browse-system-v1.component';

describe('BrowseSystemV1Component', () => {
  let component: BrowseSystemV1Component;
  let fixture: ComponentFixture<BrowseSystemV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseSystemV1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseSystemV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
