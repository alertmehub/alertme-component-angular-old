import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<am-subscriber [serviceUrl]="serviceUrl" [token]="token" [publisherId]="publisherId" [externalParameters]="externalParameters"></am-subscriber>`
})
export class AppComponent {
  public header: string = 'UMD Demo';
  token: string = 'token1';
  publisherId: string = 'test.com';
  externalParameters: object = {parameter3: 'Testing123', parameter4: '1'};
  serviceUrl = 'http://localhost:3001/api/v1';
}
