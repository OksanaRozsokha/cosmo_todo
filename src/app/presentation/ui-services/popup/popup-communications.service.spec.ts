import { TestBed } from '@angular/core/testing';

import { PopupCommunicationsService } from './popup-communications.service';

describe('PopupCommunicationsService', () => {
  let service: PopupCommunicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupCommunicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
