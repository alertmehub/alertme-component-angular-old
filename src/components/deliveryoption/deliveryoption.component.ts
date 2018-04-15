import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscriber, DeliveryOption, AlertSubscription } from '../../services/subscriber/subscriber.models';

@Component({
  selector: 'am-deliveryoption',
  templateUrl: './deliveryoption.component.html',
  styleUrls: ['./deliveryoption.component.css']
})
export class DeliveryoptionComponent implements OnInit  {

  @Input() deliveryOption: DeliveryOption;
  @Input() adding: boolean;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  editing = false;

  editedOption = new DeliveryOption();

  phonePattern = /[\+]?[1]?[-\s\.]?[(]?(\d{3})[)]?[-\s\.]?(\d{3})[-\s\.]?(\d{4})/;
  e164Pattern = /^\+1(\d{3})(\d{3})(\d{4})$/;
  emailPattern =  /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/;

  ngOnInit() {
    if(this.adding) {
      this.editDeliveryOption();
    }
  }

  updateType() {
    if (this.emailPattern.test(this.deliveryOption.value)) {
      this.deliveryOption.deliveryType = 'email';
    } else if (this.e164Pattern.test(this.deliveryOption.value)) {
      this.deliveryOption.deliveryType = 'sms';
    }
  }

  // Format the phone number as a standard display format
  formatPhoneForDisplay(phone: string): string {
    if(this.e164Pattern.test(phone)) {
      return phone.replace(this.e164Pattern, '($1) $2-$3');
    }
    return phone;
  }

  // Format the phone as E.164 for storage in the database
  formatPhoneForDB(input: string): string {
    // Make sure its a phone number
    if(this.phonePattern.test(input)) {
      return input.replace(this.phonePattern, '+1$1$2$3');
    }
    // Otherwise, return as is.
    return input;
  }

  editDeliveryOption() {
    this.editedOption.name = this.deliveryOption.name;
    this.editedOption.value = this.formatPhoneForDisplay(this.deliveryOption.value);
    this.editing = true;
  }

  saveDeliveryOption() {
    if (this.editedOption.value !== this.deliveryOption.value) {
      this.deliveryOption.status = 'not validated';
    }
    const originalValue = this.deliveryOption.value;

    this.deliveryOption.name = this.editedOption.name;
    this.deliveryOption.value = this.formatPhoneForDB(this.editedOption.value);

    // Automatically detect the type of contact - email or phone
    this.updateType();

    this.editing = false;
    this.save.emit({originalValue, newValue: this.deliveryOption.value});
  }

  cancelDeliveryOption() {
    this.editing = false;
    this.cancel.emit();
  }

  deleteDeliveryOption(deliveryOption: DeliveryOption) {
    this.delete.emit(this.deliveryOption);
    this.editing = false;
  }

}
