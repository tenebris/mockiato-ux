import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RRPairListComponent } from './rrpair-list.component';

describe('RRPairListComponent', () => {
  let component: RRPairListComponent;
  let fixture: ComponentFixture<RRPairListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RRPairListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RRPairListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
