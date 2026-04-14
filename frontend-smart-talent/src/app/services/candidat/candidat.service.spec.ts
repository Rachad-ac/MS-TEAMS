import { TestBed } from '@angular/core/testing';

import { CandidatService } from './candidat.service';

describe('ResultatService', () => {
  let service: CandidatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
