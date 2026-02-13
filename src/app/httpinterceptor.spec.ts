import { TestBed } from '@angular/core/testing';

import { HttpInterceptor } from './httpinterceptor';

describe('Httpinterceptor', () => {
  let service: typeof HttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
