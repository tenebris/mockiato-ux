import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugBlockComponent } from './debug-block.component';

describe('DebugBlockComponent', () => {
  let component: DebugBlockComponent;
  let fixture: ComponentFixture<DebugBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebugBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
