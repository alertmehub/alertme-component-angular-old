import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeliveryOption, AlertSubscription, LookupList, LookupValue } from '../../services/subscriber/subscriber.models';
import { SliderComponent } from '../slider/slider.component';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'am-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit, OnChanges {

  @Input() subscription: AlertSubscription;
  @Input() deliveryOptions: DeliveryOption[];
  @Input() externalParameters: object;
  @Output() save: EventEmitter<any> = new EventEmitter();

  // Working storage for user interaction
  active: boolean;
  parameters: object;
  deliverTo: number[];
  dropdownSettings: any = {};

  isDirty: boolean;

  // User clicked a delivery option checkbox
  deliveryOptionChanged(id: number) {
    const foundAt = this.deliverTo.indexOf(id);
    if (foundAt >= 0) {
      // Remove
      this.deliverTo.splice(foundAt, 1);
    } else {
      // Add
      this.deliverTo.push(id);
    }
    this.isDirty = true;
  }

  ngOnInit() {
    this.init();
    this.dropdownSettings = {
        singleSelection: false,
        text: 'Select',
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        enableSearchFilter: true,
        classes: 'am-dropdown'
      };
    }

  onItemSelect(item: any) {
    this.isDirty = true;
  }
  OnItemDeSelect(item: any) {
    this.isDirty = true;
  }
  onSelectAll(items: any) {
    this.isDirty = true;
  }
  onDeSelectAll(items: any) {
    this.isDirty = true;
  }

  ngOnChanges() {
    this.init();
  }

  init() {

    this.isDirty = false;

    // Save the original values passed into this component
    this.active = this.subscription.active;

    // Convert deliverTo values into a list of ids
    this.deliverTo = new Array<number>();
    for (const deliverToValue of this.subscription.deliverTo) {
      const deliveryOption = this.deliveryOptions.find((item) => item.value === deliverToValue);
      if (deliveryOption) {
        this.deliverTo.push(deliveryOption.id);
      }
    }

    // Create a deep copy of the parameters (in case the user clicks cancel)
    this.parameters = JSON.parse(JSON.stringify(this.subscription.parameters || {}));

    // Copy any external parameters passed in from the component
    for (const parameter of this.subscription.topic.parameters) {
      const externalValue = this.externalParameters ? (this.externalParameters as any)[parameter.name] : null ;
      if (externalValue) {
        (this.parameters as any)[parameter.name] = externalValue;
      }
    }
  }

  // Format the phone number as a standard display format
  formatPhoneForDisplay(phone: string): string {
    const e164Pattern = /^\+1(\d{3})(\d{3})(\d{4})$/;
    if(e164Pattern.test(phone)) {
      return phone.replace(e164Pattern, '($1) $2-$3');
    }
    return phone;
  }

  // Finds the lookup list of the given name
  findLookup(name: string): LookupValue[] {
    return this.subscription.topic.lookupLists.find((i) => i.name === name).values;
  }

  statusChanged() {
    this.isDirty = true;
    // If turning off, then go ahead and save
    if (!this.active) {
      this.saveSubscription();
    }
  }

  parameterChanged() {
    this.isDirty = true;
  }

  // Save the user inputs back to the passed in preference object
  saveSubscription() {
    this.subscription.active = this.active;

    // Convert deliverTo ids back to values
    this.subscription.deliverTo = new Array<string>();
    for (const i of this.deliverTo) {
      const option = this.deliveryOptions.find((item) => item.id === i);
      if(option) {
        this.subscription.deliverTo.push(option.value);
      }
    }

    this.subscription.parameters = this.parameters;
    this.isDirty = false;
    this.save.emit(null);
  }

  // Reinitilaze with original values
  cancelEdits() {
    this.ngOnInit();
  }

}
