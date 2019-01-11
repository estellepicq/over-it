import { Component, OnInit, ViewChild, ViewContainerRef, Injector } from '@angular/core';
import { OverlayRef, CdkOverlayOrigin, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DetailsOverlayComponent } from './details-overlay/details-overlay.component';
import { InjectionToken } from '@angular/core';

export const CONTAINER_DATA = new InjectionToken<any>('CONTAINER_DATA');

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  detailsOverlayRef: OverlayRef;
  @ViewChild(CdkOverlayOrigin) _overlayOrigin: CdkOverlayOrigin;

  constructor(
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private injector: Injector,
  ) { }

  ngOnInit() {
  }

  displayDetailsOverlay(data) {
    const strategy = this.overlay.position().connectedTo(
      this._overlayOrigin.elementRef,
      { originX: 'end', originY: 'top' },
      { overlayX: 'end', overlayY: 'top' }
    );
    const config = new OverlayConfig({
      positionStrategy: strategy
    });
    this.detailsOverlayRef = this.overlay.create(config);
    this.detailsOverlayRef.attach(
      new ComponentPortal(DetailsOverlayComponent, this.viewContainerRef, this.createInjector(data, this.detailsOverlayRef))
    );
  }

  createInjector(data: any, overlayRef: OverlayRef): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(OverlayRef, overlayRef);
    injectorTokens.set(CONTAINER_DATA, data);
    return new PortalInjector(this.injector, injectorTokens);
  }

}
