import { TestBed } from '@angular/core/testing';

import { EventPageValidService } from './event-page-valid.service';

describe('EventPageValidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventPageValidService = TestBed.get(EventPageValidService);
    expect(service).toBeTruthy();
  });
});
