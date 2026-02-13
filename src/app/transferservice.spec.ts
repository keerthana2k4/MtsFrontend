import { TestBed } from '@angular/core/testing';

import { Transferservice } from './transferservice';

describe('Transferservice', () => {
  let service: Transferservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Transferservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
