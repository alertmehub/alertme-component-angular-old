import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CustomerPreference } from './preference';

const api = 'http://np-service.azurewebsites.net/api';
// const api = 'http://localhost:3001/api';

@Injectable()
export class PreferenceService {
  constructor(private http: HttpClient) {}

  getCustomerPreference(clientId: string, token: string) {
    return this.http.get<CustomerPreference>(`${api}/prefs/${clientId}/${token}`);
  }

  updateCustomerPreference(pref: CustomerPreference) {
    return this.http.put<CustomerPreference>(`${api}/prefs/${pref.clientId}/${pref.token}`, pref);
  }
}
