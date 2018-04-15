import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscriber, DeliveryOption, AlertSubscription } from '../../services/subscriber/subscriber.models';

@Component({
  selector: 'am-deliveryoptions',
  templateUrl: './deliveryoptions.component.html',
  styleUrls: ['./deliveryoptions.component.css']
})
export class DeliveryoptionsComponent implements OnInit {

  @Input() subscriber: Subscriber;
  @Output() save: EventEmitter<any> = new EventEmitter();

  newDeliveryOption: DeliveryOption = new DeliveryOption();
  adding = false;

  ngOnInit() {

  }

  saveDeliveryOption($event: any) {

    // Update any preference records that reference this delivery option
    for (const pref of this.subscriber.subscriptions) {

      // See if the old value was in our list
      const index = pref.deliverTo.indexOf($event.originalValue);
      if (index > -1) {
        // Remove it
        pref.deliverTo.splice(index, 1);

        // Add record for the new value if it doesn't already exist
        if (pref.deliverTo.indexOf($event.newValue) === -1) {
          pref.deliverTo.push($event.newValue);
        }
      }

    }
    this.save.emit(null);
  }

  addDeliveryOption() {
    const count = this.subscriber.deliveryOptions.length;
    this.newDeliveryOption.id = count === 0 ? 1 : this.subscriber.deliveryOptions[count - 1].id + 1;
    this.newDeliveryOption.status = 'notVerified';
    this.subscriber.deliveryOptions.push(this.newDeliveryOption);
    this.adding = false;
    this.newDeliveryOption = new DeliveryOption();

    this.save.emit(null);
  }

  cancelDeliveryOption() {
    this.adding = false;
    this.newDeliveryOption = new DeliveryOption();
  }

  deleteDeliveryOption(deliveryOption: DeliveryOption) {
    // remove from list of delivery options
    this.subscriber.deliveryOptions.splice(this.subscriber.deliveryOptions.indexOf(deliveryOption), 1);

    // Remove from any subscription records that reference it
    for (const subscription of this.subscriber.subscriptions) {
      const foundAt = subscription.deliverTo.indexOf(deliveryOption.value);
      if(foundAt > -1) {
        subscription.deliverTo.splice(foundAt, 1);
      }
    }

    this.save.emit(null);
  }

}
