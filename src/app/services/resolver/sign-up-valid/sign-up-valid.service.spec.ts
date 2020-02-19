import { TestBed } from '@angular/core/testing';

import { SignUpValidService } from './sign-up-valid.service';

describe('SignUpValidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignUpValidService = TestBed.get(SignUpValidService);
    expect(service).toBeTruthy();
  });
});
