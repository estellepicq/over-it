# over-it

Learn how to create an overlay with Angular Material CDK

[Demo](http://overit.estellepicq.com/)

## Table of contents 
1. [Installation](#installation)
2. [Overlay component creation](#overlay-component-creation)
3. [Parent component](#parent-component)
4. [Inject data](#inject-data)

# Installation

1. `npm install --save @angular/material @angular/cdk @angular/animations`

2. Import `OverlayModule` in your app module:
  ```typescript
  import { OverlayModule } from '@angular/cdk/overlay';

  @NgModule({
    imports: [
      ...,
      OverlayModule
    ],
    ...
  })
  export class AppModule { }
  ```
# Overlay component creation

1. Create a new component (ex: OverlayComponent): 
`ng generate component overlay`

2. Add it to entryComponents in your app module:
```typescript
  import { OverlayModule } from '@angular/cdk/overlay';
  import { OverlayComponent } from 'overlay/overlay.component';
 
  @NgModule({
    imports: [
      ...,
      OverlayModule
    ],
    entryComponents: [
    OverlayComponent
    ...
  })
  export class AppModule { }
  ```

# Parent component
1. Add cdkOverlayOrigin to an element of the template:
```html
<button cdkOverlayOrigin (click)="displayOverlay()">Click me!</button>
```
2.  Import the following:
```typescript
import { Component, ViewChild, ViewContainerRef } from  '@angular/core';
import { OverlayRef, CdkOverlayOrigin, Overlay, OverlayConfig } from  '@angular/cdk/overlay';
import { ComponentPortal } from  '@angular/cdk/portal';
import { OverlayComponent } from  './overlay/overlay.component'; // replace by your component
```

3. Create displayOverlay function in parent component
```typescript
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
    { originX: 'end', originY: 'top' },
    { overlayX: 'end', overlayY: 'top' }
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
	this.overlayRef.backdropClick().subscribe(() =>  this.overlayRef.detach()); // Allows to close overlay by clicking around it
	}
}
```

# Inject data
1. Create a file tokens.ts and add this content:
```typescript
import { InjectionToken } from '@angular/core';
export const CONTAINER_DATA = new InjectionToken<any>('CONTAINER_DATA');
```

2. Add an injection function to your parent component
```typescript
import { ..., Injector } from '@angular/core';
import { ..., PortalInjector } from '@angular/cdk/portal';  
import { CONTAINER_DATA } from './tokens';
constructor (
  ...,
  private injector: Injector
) { }
createInjector(data: any, overlayRef: OverlayRef): PortalInjector {
  const injectorTokens = new WeakMap();
  injectorTokens.set(OverlayRef, overlayRef);
  injectorTokens.set(CONTAINER_DATA, data);
  return new PortalInjector(this.injector, injectorTokens);
}
```

3. Inject data within the displayOverlay() function
```typescript
...
this.overlayRef.attach(
  new ComponentPortal(OverlayComponent, this.viewContainerRef,
    this.createInjector({ data: 'Your data' }, this.overlayRef) // this is new
  )
);
...
```

4. Get data in overlay component

```typescript
import { ..., Inject } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { CONTAINER_DATA } from '../tokens';

...

constructor(
  @Inject(CONTAINER_DATA) public data: any, // Here are your data
  public overlayRef: OverlayRef
  ) { }

close() {
  this.overlayRef.detach(); // Close overlay from the component itself
}

...
```

5. Display it in the overlay template
```html
<div class="overlay-container">
  <p>This is the injected data: {{ data.data }}</p>
  <div>
    <button mat-raised-button (click)="close()">Close me!</button>
  </div>
</div>
```
