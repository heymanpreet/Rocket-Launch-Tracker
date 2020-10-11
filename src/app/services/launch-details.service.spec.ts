import { TestBed } from '@angular/core/testing';

import { LaunchDetailsService } from './launch-details.service';

describe('LaunchDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaunchDetailsService = TestBed.get(LaunchDetailsService);
    expect(service).toBeTruthy();
  });
});
