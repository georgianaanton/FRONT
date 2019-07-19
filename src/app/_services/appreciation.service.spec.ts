import { TestBed } from '@angular/core/testing';

import { AppreciationService } from './appreciation.service';

describe('AppreciationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppreciationService = TestBed.get(AppreciationService);
    expect(service).toBeTruthy();
  });
});
