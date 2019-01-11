- npm install @angular/cdk
- import OverlayModule in module
- import { OverlayRef, CdkOverlayOrigin, Overlay, OverlayConfig } from '@angular/cdk/overlay' in parent component
- import { ComponentPortal, PortalInjector } from '@angular/cdk/portal' in parent component
- create component for overlay
- add it to entryComponents of module
- add cdkOverlayOrigin in the parent component template

- this is for injecting data
  import { InjectionToken } from '@angular/core';
  export const CONTAINER_DATA = new InjectionToken<any>('CONTAINER_DATA');

- add function to open overlay
  detailsOverlayRef: OverlayRef;
  @ViewChild(CdkOverlayOrigin) _overlayOrigin: CdkOverlayOrigin;

  constructor(
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private injector: Injector,
  ) { }

  displayDetailsOverlay() {
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
      new ComponentPortal(WidgetActionsOverlayComponent, this.viewContainerRef, this.createInjector(widget, this.detailsOverlayRef))
    );
  }

  createInjector(data: any, overlayRef: OverlayRef): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(OverlayRef, overlayRef);
    injectorTokens.set(CONTAINER_DATA, data);
    return new PortalInjector(this.injector, injectorTokens);
  }

- Add detach function to overlay
  constructor(
    public overlayRef: OverlayRef
    ) { }

  ngOnInit() {
  }

  detachOverlay() {
    this.overlayRef.detach();
  }

- Or add backdrop in overlay config 
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
then 
    this.detailsOverlayRef.backdropClick().subscribe(() => {
      this.detailsOverlayRef.dispose();
    });
