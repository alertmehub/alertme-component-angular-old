import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Customer, AlertPreference } from './preference';

@Injectable()
export class PreferenceService {
  api: string = 'http://service.alertmehub.com/api';

  constructor(private http: HttpClient) {}

  setUrl(url: string) {
    this.api = url;
  }

  getCustomer(clientId: string, token: string) {
    return this.http.get<Customer>(`${this.api}/customers/${clientId}/${token}`);
  }

  updateCustomer(customer: Customer) {
    return this.http.put<Customer>(`${this.api}/customers/${customer.clientId}/${customer.token}`, customer);
  }

  saveAlertPreference(pref: AlertPreference, token: string) {
    return this.http.put<AlertPreference>(`${this.api}/prefs/${pref.clientId}/${token}`, pref);
  }
}
