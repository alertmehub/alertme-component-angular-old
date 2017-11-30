import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerPreference, DeliveryOption, AlertPreference } from '../../services/preference/preference';

@Component({
  selector: 'np-deliveryoptions',
  templateUrl: './deliveryoptions.component.html',
  styleUrls: ['./deliveryoptions.component.css']
})
export class DeliveryoptionsComponent implements OnInit {

  @Input() customerPreference: CustomerPreference;
  @Output() save: EventEmitter<any> = new EventEmitter();

  newDeliveryOption: DeliveryOption = new DeliveryOption();
  adding = false;

  ngOnInit() {

  }

  addDeliveryOption() {
    const emailPattern =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (emailPattern.test(this.newDeliveryOption.value)) {
      this.newDeliveryOption.deliveryType = 'email';
    }

    const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (phonePattern.test(this.newDeliveryOption.value)) {
      this.newDeliveryOption.deliveryType = 'text';
    }

    const count = this.customerPreference.deliveryOptions.length;
    this.newDeliveryOption.id = count === 0 ? 1 : this.customerPreference.deliveryOptions[count - 1].id + 1;
    this.newDeliveryOption.status = 'notVerified';
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
      pref.deliverTo.splice(pref.deliverTo.indexOf(deliveryOption.id), 1);
    }

    this.save.emit(null);
  }

}
