import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { OverlayRef, CdkOverlayOrigin, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayComponent } from './overlay/overlay.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  overlayRef: OverlayRef;
  @ViewChild(CdkOverlayOrigin) _overlayOrigin: CdkOverlayOrigin;

  constructor(
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef
  ) { }

  displayOverlay() {
    const strategy = this.overlay.position().connectedTo(
      this._overlayOrigin.elementRef,
      { originX: 'start', originY: 'top' },
      { overlayX: 'start', overlayY: 'top' }
    );
    const config = new OverlayConfig({
      positionStrategy: strategy,
      hasBackdrop: true,
      backdropClass: 'transparent'
    });
    this.overlayRef = this.overlay.create(config);
    this.overlayRef.attach(
      new ComponentPortal(OverlayComponent, this.viewContainerRef)
    );
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }

}
