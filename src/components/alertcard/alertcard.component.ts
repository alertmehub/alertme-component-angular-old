import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeliveryOption, AlertPreference, AlertPrefParameter } from '../../services/preference/preference';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'np-alertcard',
  templateUrl: './alertcard.component.html',
  styleUrls: ['./alertcard.component.css']
})
export class AlertcardComponent implements OnInit {

  @Input() alertPref: AlertPreference;
  @Input() deliveryOptions: DeliveryOption[];
  @Input() externalParameters: object;
  @Output() save: EventEmitter<any> = new EventEmitter();

  // Working storage for user interaction
  active: boolean;
  parameters: ParameterInput[];
  deliverTo: number[];

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

    this.isDirty = false;

    // Save the original values passed into this component
    this.active = this.alertPref.active;

    this.deliverTo = new Array<number>();
    for (const i of this.alertPref.deliverTo){
      this.deliverTo.push(i);
    }

    // Combine parameter defintion and value into one array
    this.parameters = new Array<ParameterInput>();
    const alertDefParameters = this.alertPref.alertDef.parameters;
    for (const parameter of alertDefParameters){
      const pref = this.alertPref.parameters.find((p) => p.parameterId === parameter.id);
      let value = this.externalParameters ? (this.externalParameters as any)[parameter.id.toLowerCase()] : null ;
      if (!value) {
        value = pref ? pref.value : '';
      }
      this.parameters.push({id: parameter.id, label: parameter.label, value});
    }
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
    this.alertPref.deliverTo = new Array<number>();
    for (const i of this.deliverTo){
      this.alertPref.deliverTo.push(i);
    }
    this.alertPref.parameters = new Array<AlertPrefParameter>();
    for (const p of this.parameters){
      this.alertPref.parameters.push({parameterId: p.id, value: p.value});
    }
    this.isDirty = false;
    this.save.emit(null);
  }

  // Reinitilaze with original values
  cancelPref() {
    this.ngOnInit();
  }

}

export class ParameterInput {
  id: string;
  label: string;
  value: string;
}
