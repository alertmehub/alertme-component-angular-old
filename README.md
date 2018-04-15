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
Then place the component onto a page that will be used to subscribe to alerts.  Here is an example page that uses the alertme preference component <am-subscriber>
```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-alerts',
  template: `
    <h1>Alerts!!</h1>
    <p>Sign up to be notified of important news and events.</p>
    <div style='background-color: white; padding: 10px'>
      <am-subscriber 
        [token]="token" [clientId]="clientId">
      </am-subscriber>
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
An authorization token is acquired by making a server-side GET request to https://api.alertmehub.com/api/token/[clientid]/[userid] and setting the Authorization header to the alertme API key.

   - The userid can be any string that uniquely identifies your customer who is currently logged into your customer portal - such as a customer id, account id, or any unique hashed value.
   - See the next section for how to get the client id and API key.

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

## Alertme Registration
In order to use Alertme, you must first register your company at htts://admin.alertmehub.com. 

You'll pick a client id - typically identified by the domain that your customer portal runs on - e.g. toyita.com. After registering you'll be provided with an API key which you can use to obtain customer tokens as described in the previous section.

## Configure Alert Topics
The alert topics that your customers can subscribe to are managed via the Alertme administration site.  https://admin.alertmehub.com

