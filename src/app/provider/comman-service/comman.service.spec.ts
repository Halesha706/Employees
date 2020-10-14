import { TestBed } from '@angular/core/testing';

import { CommanServices } from './comman.service';

describe('CommanService', () => {
  let service: CommanServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommanServices);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
