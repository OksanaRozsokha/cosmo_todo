import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PopupCommunicationsService {

  public isPopupVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _bodyOwerflowClassName: string = 'body-owerflow';

  public open(): void {
    this.isPopupVisible$.next(true);
    document.body.classList.add(this._bodyOwerflowClassName)
  }

  public close(): void {
    this.isPopupVisible$.next(false);
    document.body.classList.remove(this._bodyOwerflowClassName);
  }
}
