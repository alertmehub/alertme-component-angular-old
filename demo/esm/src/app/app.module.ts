import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { TickTockModule, NetprefsModule } from '../../lib/';

@NgModule({
  imports: [ BrowserModule, TickTockModule, NetprefsModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
