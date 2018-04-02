import { TestBed, inject } from '@angular/core/testing';

import { MinixClientService } from './minix-client.service';

describe('MinixClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MinixClientService]
    });
  });

  it('should be created', inject([MinixClientService], (service: MinixClientService) => {
    expect(service).toBeTruthy();
  }));
});
