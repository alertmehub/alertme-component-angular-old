import { Component, Input, OnInit } from '@angular/core';

import { CustomerPreference, DeliveryOption } from '../../services/preference/preference';
import { PreferenceService } from '../../services/preference/preference.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'np-preferences',
  templateUrl: './preference.component.html'
})
export class PreferenceComponent implements OnInit {

  @Input() token: string;
  @Input() clientId: string;
  @Input() externalParameters: object;

  dirty = false;
  customerPreference: CustomerPreference;

  constructor(private prefService: PreferenceService) {}

  ngOnInit() {
    this.getCustomerPreference();
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
