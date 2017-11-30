import { NgModule } from '@angular/core';
import { AlertcardComponent, DeliveryoptionsComponent,
          PreferenceComponent, SliderComponent } from './components';
import { PreferenceService } from './services';

@NgModule({
  providers: [
    PreferenceService,
  ],
  declarations: [
    AlertcardComponent,
    DeliveryoptionsComponent,
    PreferenceComponent,
    SliderComponent
  ],
  exports: [
    AlertcardComponent,
    DeliveryoptionsComponent,
    PreferenceComponent,
    SliderComponent
  ]
})
export class NetprefsModule {
}
