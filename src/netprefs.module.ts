import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
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
