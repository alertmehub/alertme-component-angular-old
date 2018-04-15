import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { SubscriptionComponent, DeliveryoptionsComponent, DeliveryoptionComponent,
          SubscriberComponent, SliderComponent } from './components';
import { SubscriberService } from './services';

@NgModule({
  providers: [
    SubscriberService,
  ],
  declarations: [
    SubscriptionComponent,
    DeliveryoptionsComponent,
    DeliveryoptionComponent,
    SubscriberComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AngularMultiSelectModule
  ],
  exports: [
    SubscriptionComponent,
    DeliveryoptionsComponent,
    DeliveryoptionComponent,
    SubscriberComponent,
    SliderComponent
  ]
})
export class AlertmeModule {
}
