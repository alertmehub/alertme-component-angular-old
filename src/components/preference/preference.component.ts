import { Component, Input, OnInit } from '@angular/core';

import { CustomerPreference, DeliveryOption } from '../../services/preference/preference';
import { PreferenceService } from '../../services/preference/preference.service';
import { Subscription } from 'rxjs/Subscription';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'np-preferences',
  templateUrl: './preference.component.html'
})
export class PreferenceComponent implements OnInit, OnChanges {

  @Input() token: string;
  @Input() clientId: string;
  @Input() externalParameters: object;

  dirty = false;
  customerPreference: CustomerPreference;

  constructor(private prefService: PreferenceService) {}

  ngOnInit() {
    if (this.token && this.clientId) {
      this.getCustomerPreference();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.token && this.clientId) {
      this.getCustomerPreference();
    }
  }

  getCustomerPreference() {
    return this.prefService.getCustomerPreference(this.clientId, this.token).subscribe((pref) => {
      this.customerPreference = pref;
    });
  }

  saveCustomerPreference() {
      this.prefService.updateCustomerPreference(this.customerPreference).subscribe(() => {
          this.dirty = false;
        });
  }
}
