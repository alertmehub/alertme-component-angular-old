import { Component, Input, OnInit } from '@angular/core';

import { Customer, DeliveryOption, AlertPreference } from '../../services/preference/preference';
import { PreferenceService } from '../../services/preference/preference.service';
import { Subscription } from 'rxjs/Subscription';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'np-preferences',
  templateUrl: './preference.component.html'
})
export class PreferenceComponent implements OnInit, OnChanges {

  @Input() token: string;       // User token passed to the browser to identify the logged in user
  @Input() clientId: string;    // Id of the company using this component
  @Input() externalParameters: object; // Any external data that should be passed along and saved as a parameter value
  @Input() serviceUrl: string;  // The url of the backend service to use to fetch/save data

  dirty = false;
  customer: Customer;

  constructor(private prefService: PreferenceService) {}

  ngOnInit() {
    // if (this.token && this.clientId) {
    //   this.getCustomerPreference();
    // }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.serviceUrl) {
      this.prefService.setUrl(this.serviceUrl);
    }

    if (this.token && this.clientId) {

      this.getCustomerPreference();
    }
  }

  getCustomerPreference() {
    return this.prefService.getCustomer(this.clientId, this.token).subscribe((customer) => {
      this.customer = customer;
    });
  }

  saveCustomer() {
      this.prefService.updateCustomer(this.customer).subscribe(() => {
          this.dirty = false;
        });
  }

  saveAlertPreference(pref: AlertPreference) {
      this.prefService.saveAlertPreference(pref, this.customer.token).subscribe(() => {
          this.dirty = false;
        });
  }
}
