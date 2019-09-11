import { TestBed } from '@angular/core/testing';

import { SessionsDataService } from './sessions-data.service';

describe('SessionsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionsDataService = TestBed.get(SessionsDataService);
    expect(service).toBeTruthy();
  });
});
