import { TestBed } from '@angular/core/testing';

import { PresenceService } from './presence.service';

describe('ResultatService', () => {
  let service: PresenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
