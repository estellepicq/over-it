import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isOverlayDisplayed = false;

  public readonly overlayOptions: Partial<CdkConnectedOverlay> = {
    hasBackdrop: true,
    positions: [
      { originX: 'end', originY: 'bottom', overlayX: 'start',  overlayY: 'top'}
    ],
    /* You can add to this object all of these options */
    // backdropClass: '',
    // flexibleDimensions: false,
    // growAfterOpen: false,
    // height: 'auto',
    // width: 'auto',
    // lockPosition: true,
    // minHeight: 'unset',
    // minWidth: 'unset',
    // offsetX: 0,
    // offsetY: 0,
    // panelClass: '',
    // positionStrategy,
    // push,
    // scrollStrategy,
    // transformOriginSelector,
    // viewportMargin,
  };

  constructor() { }

  public displayOverlay(): void {
    this.isOverlayDisplayed = true;
  }

  public hideOverlay(): void {
    this.isOverlayDisplayed = false;
  }

}
