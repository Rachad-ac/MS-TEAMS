import { TestBed } from '@angular/core/testing';

import { SissionFormationService } from './session-formation.service';

describe('SissionFormationService', () => {
  let service: SissionFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SissionFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
