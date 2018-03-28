# `alertme-component-angular`


Component to display user preferences.

## Overview
The alertme component is intended to be dropped onto an existing customer portal, enabling customers to subscribe to relevant business alerts.  e.g.
  - Banking
    - Alert me when my balance is below $x
    - Alert me when a transaction exceeds $x
  - eCommerce
    - Alert me when my order ships
    - Alert me of new products
  - Service provider
    - Alert me of planned outages
    - Alert me when my usage limit is near.
  - etc.

The actual business alert topics are configured via an administration site.  This component displays those topics and collects the preferences for each customer.

## Installation
To pull the alertme component into your Angular project, 
```
npm install --save alertme-component-angular
```

## Usage
Then place the component onto a page that will be used to subscribe to alerts.  Here is an example page that uses the alertme preference component <np-preferences>
```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-alerts',
  template: `
    <h1>Alerts!!</h1>
    <p>Sign up to be notified of important news and events.</p>
    <div style='background-color: white; padding: 10px'>
      <np-preferences 
        [token]="token" [clientId]="clientId">
      </np-preferences>
    </div>
    `
})
export class AlertsComponent implements OnInit {
  token: string;
  clientId = 'toyita.com';

  constructor(private userService: UserService) { }

  ngOnInit() {
      this.token = this.userService.alertmeToken;
  });


}
```

The above example assumes that the existing customer portal has a login process for the customer, and that an Alertme authorization token for that customer is retrieved from the Alertme API and is stored in a service called userService.

## Alertme Registration

An authorization token is acquired by making a server-side GET request to https://api.alertmehub.com/api/token/[clientid]/[userid] and setting the Authorization header to the alertme API key.
The client id corresponds to the company using the alertme system and can be acquired by registering for an Alertme account at htts://admin.alertmehub.com 
The userid can be any string that uniquely identifies the client's customer that is currently logged into their customer portal - such as a customer id, account id, or a unique hashed value.
The alertme API key is also acquired from the alertme admin site.  

Example server-side code to retrieve an Alertme token using the Axios node library.

``` typescript
    var alertmeClient = axios.create({
      baseURL: 'https://api.alertmehub.com/api/',
      timeout: 1000,
      headers: {'Authorization': '2f27a22d980134dfc56cf8da5aa1d02ea08802d26804f0db604439281aff14c6'}
    });

    // Retrieve Data
    let amToken = await alertmeClient.get("token/toyita.com/" + userId );
```

It is important that the Alertme API key be treated as a secret and not exposed in client-side code.  The example code shown above should only be run via server-side code.  

## Configure Alert Topics
The alert topics that your customers can subscribe to are managed via the Alertme administration site.  https://admin.alertmehub.com

