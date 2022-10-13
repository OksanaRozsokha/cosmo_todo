import { TestBed } from '@angular/core/testing';

import { PopupCommunicationsService } from './popup-communications.service';

describe('PopupCommunicationsService', () => {
  let service: PopupCommunicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PopupCommunicationsService
      ]
    });
    service = TestBed.inject(PopupCommunicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('open() emits true in isPopupVisible$ BehaviorSubject', (done) => {
    service.open();
    service.isPopupVisible$.subscribe(result => {
      expect(result).toBeTrue();
      done();
    })
  })

  it('close() emits false in isPopupVisible$  BehaviorSubject', (done) => {
    service.close();
    service.isPopupVisible$.subscribe(result => {
      expect(result).toBeFalse();
      done();
    })
  })
});
