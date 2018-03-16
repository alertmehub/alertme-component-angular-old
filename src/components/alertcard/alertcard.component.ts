import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeliveryOption, AlertPreference, LookupList, LookupValue } from '../../services/preference/preference';
import { SliderComponent } from '../slider/slider.component';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'np-alertcard',
  templateUrl: './alertcard.component.html',
  styleUrls: ['./alertcard.component.css']
})
export class AlertcardComponent implements OnInit, OnChanges {

  @Input() alertPref: AlertPreference;
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
        classes: 'np-dropdown'
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
    this.active = this.alertPref.active;

    // Convert deliverTo values into a list of ids
    this.deliverTo = new Array<number>();
    for (const deliverToValue of this.alertPref.deliverTo){
      const deliveryOption = this.deliveryOptions.find((item) => item.value === deliverToValue);
      if (deliveryOption) {
        this.deliverTo.push(deliveryOption.id);
      }
    }

    // Create a deep copy of the parameters (in case the user clicks cancel)
    this.parameters = JSON.parse(JSON.stringify(this.alertPref.parameters || {}));

    // Copy any external parameters passed in from the component
    for (const parameter of this.alertPref.alertDef.parameters){
      const externalValue = this.externalParameters ? (this.externalParameters as any)[parameter.name] : null ;
      if (externalValue) {
        (this.parameters as any)[parameter.name] = externalValue;
      }
    }
  }

  // Finds the lookup list of the given name
  findLookup(name: string): LookupValue[] {
    return this.alertPref.alertDef.lookupLists.find((i) => i.name === name).values;
  }

  statusChanged() {
    this.isDirty = true;
    // If turning off, then go ahead and save
    if (!this.active) {
      this.savePref();
    }
  }

  parameterChanged() {
    this.isDirty = true;
  }

  // Save the user inputs back to the passed in preference object
  savePref() {
    this.alertPref.active = this.active;

    // Convert deliverTo ids back to values
    this.alertPref.deliverTo = new Array<string>();
    for (const i of this.deliverTo){
      this.alertPref.deliverTo.push(this.deliveryOptions.find((item) => item.id === i).value);
    }

    this.alertPref.parameters = this.parameters;
    this.isDirty = false;
    this.save.emit(null);
  }

  // Reinitilaze with original values
  cancelPref() {
    this.ngOnInit();
  }

}
