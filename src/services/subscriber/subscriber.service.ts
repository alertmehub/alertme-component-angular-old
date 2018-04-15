import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Subscriber, AlertSubscription } from './subscriber.models';

@Injectable()
export class SubscriberService {
  api: string = 'https://component.alertmehub.com/api/v1';

  constructor(private http: HttpClient) {}

  setUrl(url: string) {
    this.api = url;
  }

  getSubscriber(publisherId: string, token: string) {
    return this.http.get<Subscriber>(`${this.api}/subscribers/${publisherId}/${token}`);
  }

  updateSubscriber(subscriber: Subscriber) {
    return this.http.put<Subscriber>(`${this.api}/subscribers/${subscriber.publisherId}/${subscriber.token}`, subscriber);
  }

  saveAlertSubscription(subscription: AlertSubscription, token: string) {
    return this.http.put<AlertSubscription>(`${this.api}/subscriptions/${subscription.publisherId}/${token}`, subscription);
  }
}
