import { Injectable, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root'
})
export class UnsubscribeAdapterService implements OnDestroy {/**The subscription sink object that stores all subscriptions */
  subs = new SubSink();/**
* The lifecycle hook that unsubscribes all subscriptions
* when the component / object gets destroyed
*/
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
