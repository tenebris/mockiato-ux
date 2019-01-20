import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListV2Component } from './service-list-v2.component';

describe('ServiceListV2Component', () => {
  let component: ServiceListV2Component;
  let fixture: ComponentFixture<ServiceListV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceListV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceListV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
