import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototypeUxComponent } from './prototype-ux.component';

describe('PrototypeUxComponent', () => {
  let component: PrototypeUxComponent;
  let fixture: ComponentFixture<PrototypeUxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrototypeUxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrototypeUxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
