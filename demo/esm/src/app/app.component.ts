import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<tick-tock></tick-tock>
  <np-preferences [serviceUrl]="serviceUrl" [token]="token" [clientId]="clientId" [externalParameters]="externalParameters"></np-preferences>

`
})
export class AppComponent {
  public header: string = 'UMD Demo';
  token: string = 'e803b4ac2d2f83094849dbfb3c4c98506fceb1fdab82de97d1fe9f03f1ef9062';
  clientId: string = 'contoso.com';
  externalParameters: object = {custId: '1', accountId: '1'};
  serviceUrl = 'http://localhost:3001/api';
}
