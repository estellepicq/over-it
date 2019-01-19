import { Component, ViewChild, ViewContainerRef, Injector } from '@angular/core';
import { OverlayRef, CdkOverlayOrigin, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { OverlayComponent } from './overlay/overlay.component';
import { CONTAINER_DATA } from './tokens';

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
    public viewContainerRef: ViewContainerRef,
    private injector: Injector,
  ) { }

  displayOverlay() {
    const strategy = this.overlay.position().connectedTo(
      this._overlayOrigin.elementRef,
      { originX: 'end', originY: 'top' },
      { overlayX: 'start', overlayY: 'top' }
    );
    const config = new OverlayConfig({
      positionStrategy: strategy,
      hasBackdrop: true,
      backdropClass: 'transparent'
    });
    this.overlayRef = this.overlay.create(config);
    this.overlayRef.attach(
      new ComponentPortal(OverlayComponent, this.viewContainerRef,
        this.createInjector({ data: 'Your data' }, this.overlayRef)
      )
    );
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }

  createInjector(data: any, overlayRef: OverlayRef): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(OverlayRef, overlayRef);
    injectorTokens.set(CONTAINER_DATA, data);
    return new PortalInjector(this.injector, injectorTokens);
  }

}
