import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RRPairComponent } from './rrpair.component';

describe('RRPairComponent', () => {
  let component: RRPairComponent;
  let fixture: ComponentFixture<RRPairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RRPairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RRPairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
