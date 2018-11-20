import { TestBed } from '@angular/core/testing';

import { GroupListService } from './group-list.service';

describe('GroupListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupListService = TestBed.get(GroupListService);
    expect(service).toBeTruthy();
  });
});
