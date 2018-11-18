import { TestBed } from '@angular/core/testing';

import { ScriptStoreService } from './script-store.service';

describe('ScriptStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScriptStoreService = TestBed.get(ScriptStoreService);
    expect(service).toBeTruthy();
  });
});
