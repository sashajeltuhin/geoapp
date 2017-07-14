/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HandlerService } from './handler.service';

describe('HandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandlerService]
    });
  });

  it('should ...', inject([HandlerService], (service: HandlerService) => {
    expect(service).toBeTruthy();
  }));
});
