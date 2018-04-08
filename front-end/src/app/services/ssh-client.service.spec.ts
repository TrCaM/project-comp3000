import { TestBed, inject } from '@angular/core/testing';

import { SSHClientService } from './ssh-client.service';

describe('SSHClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SSHClientService]
    });
  });

  it('should be created', inject([SSHClientService], (service: SSHClientService) => {
    expect(service).toBeTruthy();
  }));
});
