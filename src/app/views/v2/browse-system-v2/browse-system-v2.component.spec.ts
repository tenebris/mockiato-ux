import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseSystemV2Component } from './browse-system-v2.component';

describe('BrowseSystemV2Component', () => {
  let component: BrowseSystemV2Component;
  let fixture: ComponentFixture<BrowseSystemV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseSystemV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseSystemV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
