import { TestBed } from '@angular/core/testing';

import { UnsubscribeAdapterService } from './unsubscribe-adapter.service';

describe('UnsubscribeAdapterService', () => {
  let service: UnsubscribeAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsubscribeAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
