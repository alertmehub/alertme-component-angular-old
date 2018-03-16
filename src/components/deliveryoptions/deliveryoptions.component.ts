import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer, DeliveryOption, AlertPreference } from '../../services/preference/preference';

@Component({
  selector: 'np-deliveryoptions',
  templateUrl: './deliveryoptions.component.html',
  styleUrls: ['./deliveryoptions.component.css']
})
export class DeliveryoptionsComponent implements OnInit {

  @Input() customerPreference: Customer;
  @Output() save: EventEmitter<any> = new EventEmitter();

  newDeliveryOption: DeliveryOption = new DeliveryOption();
  adding = false;

  ngOnInit() {

  }

  saveDeliveryOption($event: any) {

    // Update any preference records that reference this delivery option
    for (const pref of this.customerPreference.alertPreferences) {

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
    const count = this.customerPreference.deliveryOptions.length;
    this.newDeliveryOption.id = count === 0 ? 1 : this.customerPreference.deliveryOptions[count - 1].id + 1;
    this.newDeliveryOption.status = 'notVerified';
    this.newDeliveryOption.updateType();
    this.customerPreference.deliveryOptions.push(this.newDeliveryOption);
    this.cancelDeliveryOption();

    this.save.emit(null);
  }

  cancelDeliveryOption() {
    this.adding = false;
    this.newDeliveryOption = new DeliveryOption();
  }

  deleteDeliveryOption(deliveryOption: DeliveryOption) {
    // remove from list of delivery options
    this.customerPreference.deliveryOptions.splice(this.customerPreference.deliveryOptions.indexOf(deliveryOption), 1);

    // Remove from any preference records that reference it
    for (const pref of this.customerPreference.alertPreferences){
      pref.deliverTo.splice(pref.deliverTo.indexOf(deliveryOption.value), 1);
    }

    this.save.emit(null);
  }

}
