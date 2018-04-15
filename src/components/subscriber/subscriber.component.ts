import { Component, Input, OnInit } from '@angular/core';

import { Subscriber, DeliveryOption, AlertSubscription } from '../../services/subscriber/subscriber.models';
import { SubscriberService } from '../../services/subscriber/subscriber.service';
import { Subscription } from 'rxjs/Subscription';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'am-subscriber',
  templateUrl: './subscriber.component.html'
})
export class SubscriberComponent implements OnInit, OnChanges {

  @Input() token: string;       // Subscriber token passed to the browser to identify the logged in user
  @Input() publisherId: string;    // Id of the company using this component
  @Input() externalParameters: object; // Any external data that should be passed along and saved as a parameter value
  @Input() serviceUrl: string;  // The url of the backend service to use to fetch/save data

  dirty = false;
  subscriber: Subscriber;

  constructor(private subService: SubscriberService) {}

  ngOnInit() {
    // if (this.token && this.clientId) {
    //   this.getCustomerPreference();
    // }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.serviceUrl) {
      this.subService.setUrl(this.serviceUrl);
    }

    if (this.token && this.publisherId) {

      this.getSubscriber();
    }
  }

  getSubscriber() {
    return this.subService.getSubscriber(this.publisherId, this.token).subscribe((customer) => {
      this.subscriber = customer;
    });
  }

  saveSubscriber() {
      this.subService.updateSubscriber(this.subscriber).subscribe(() => {
          this.dirty = false;
        });
  }

  saveSubscription(subscription: AlertSubscription) {
      this.subService.saveAlertSubscription(subscription, this.subscriber.token).subscribe(() => {
          this.dirty = false;
        });
  }
}
