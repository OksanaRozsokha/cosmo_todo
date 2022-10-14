import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import { PopupCommunicationsService } from '../../../ui-services/popup/popup-communications.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StopPropagationDirective } from '../../directives/stop-propagation/stop-propagation.directive';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  let mockPopupService: jasmine.SpyObj<PopupCommunicationsService> = jasmine.createSpyObj<PopupCommunicationsService>('popupService', ['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: PopupCommunicationsService, useValue: mockPopupService}
      ],
      declarations: [ PopupComponent, StopPropagationDirective ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockPopupService.close.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close() method should be called on overlay click', () => {
    const overlay = fixture.debugElement.query(By.css('[data-overlay-test]')).nativeElement;
    overlay.click();

    expect(mockPopupService.close).toHaveBeenCalledTimes(1);
  })

  it('close() method should not be called on popup click', () => {
    const popup = fixture.debugElement.query(By.css('[data-overlay-test]')).children[0].nativeElement;
    popup.click();

    expect(mockPopupService.close).toHaveBeenCalledTimes(0);
  })
});
