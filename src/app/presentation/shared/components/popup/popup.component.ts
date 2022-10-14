import { Component } from '@angular/core';
import { PopupCommunicationsService } from '../../../ui-services/popup/popup-communications.service';

@Component({
  selector: 'app-popup',
  template: `
   <div data-overlay-test class="cosmo-overlay" (click)="popupService.close()" >
      <div class="cosmo-popup grid-row grid-row--space-between-h grid-row--column-reverse-on-sm" appStopPropagation>
        <ng-content></ng-content>
      </div>
   </div>
  `,
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent {

  constructor(public popupService: PopupCommunicationsService) { }

 }
