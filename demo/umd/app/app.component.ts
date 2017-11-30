import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<tick-tock></tick-tock>
  umd
  `
})
export class AppComponent {
  public header: string = 'UMD Demo';
  token: string = 'abc123111111111';
  clientId: string = '1';
  externalParameters: object = {custId: '111111111', accountId: '1'};
}
//<np-preferences [token]="token" [clientId]="clientId" [externalParameters]="externalParameters"></np-preferences>
