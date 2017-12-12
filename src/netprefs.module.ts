import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AlertcardComponent, DeliveryoptionsComponent, DeliveryoptionComponent,
          PreferenceComponent, SliderComponent } from './components';
import { PreferenceService } from './services';

@NgModule({
  providers: [
    PreferenceService,
  ],
  declarations: [
    AlertcardComponent,
    DeliveryoptionsComponent,
    DeliveryoptionComponent,
    PreferenceComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    AlertcardComponent,
    DeliveryoptionsComponent,
    DeliveryoptionComponent,
    PreferenceComponent,
    SliderComponent
  ]
})
export class NetprefsModule {
}
