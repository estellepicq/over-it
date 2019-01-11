import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OverlayComponent } from './overlay/overlay.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { DetailsOverlayComponent } from './overlay/details-overlay/details-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    OverlayComponent,
    DetailsOverlayComponent
  ],
  imports: [
    BrowserModule,
    OverlayModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DetailsOverlayComponent
  ]
})
export class AppModule { }
