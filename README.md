# over-it

Learn how to create an overlay with Angular Material CDK

[Demo](http://overit.estellepicq.com/)

## Table of contents 
- [over-it](#over-it)
  - [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Overlay component creation](#overlay-component-creation)
- [Parent component](#parent-component)
- [Passing data to overlay component](#passing-data-to-overlay-component)
- [Close overlay](#close-overlay)

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

# Parent component
1. Add cdkOverlayOrigin to an element of the template:
```html
<button cdkOverlayOrigin (click)="displayOverlay()" #trigger="cdkOverlayOrigin">Click me!</button>
```
2.  Import the following:
```typescript
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
```

3. Add overlay options inside parent component, and functions for displaying / hiding overlay
```typescript
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
```

4. Add overlay in parent template with optionnal configuration
```html
<ng-template
  #connectedOverlay="cdkConnectedOverlay"
  cdkConnectedOverlay
  [cdkConnectedOverlayOrigin]="trigger"
  [cdkConnectedOverlayOpen]="isOverlayDisplayed"
  [cdkConnectedOverlayHasBackdrop]="overlayOptions.hasBackdrop"
  [cdkConnectedOverlayPositions]="overlayOptions.positions">
  <app-overlay></app-overlay> <!-- Your overlay component -->
</ng-template>
```


# Passing data to overlay component
1. Create an input property inside overlay component
```typescript
export class OverlayComponent {

  @Input() data: { msg: string };
  ...
}
```

2. Pass data through parent component
```html
...
<app-overlay [data]="{msg: 'Your data'}"></app-overlay>
...
```

5. Display it in the overlay template
```html
<div class="overlay-container">
  <p>This is the injected data: {{ data.data }}</p>
</div>
```

# Close overlay
1. Option 1: On backdrop click
When 'hasBackdrop' option is activated, a backdropClick event is emitted. We can get it in parent component as follow.

```html
...
<ng-template
  #connectedOverlay="cdkConnectedOverlay"
  cdkConnectedOverlay
  [cdkConnectedOverlayOrigin]="trigger"
  [cdkConnectedOverlayOpen]="isOverlayDisplayed"
  [cdkConnectedOverlayHasBackdrop]="overlayOptions.hasBackdrop"
  [cdkConnectedOverlayPositions]="overlayOptions.positions"
  (backdropClick)="hideOverlay()">
  <app-overlay [data]="{msg: 'Your data'}"></app-overlay>
</ng-template>
...
```

2. Option 2: From overlay component

In the parent component:
- listen to detach event, in order to update isOverlayDisplayed property
- pass connectedOverlay as an input of overlay component

```html
...
<ng-template
  #connectedOverlay="cdkConnectedOverlay"
  cdkConnectedOverlay
  [cdkConnectedOverlayOrigin]="trigger"
  [cdkConnectedOverlayOpen]="isOverlayDisplayed"
  [cdkConnectedOverlayHasBackdrop]="overlayOptions.hasBackdrop"
  [cdkConnectedOverlayPositions]="overlayOptions.positions"
  (backdropClick)="hideOverlay()"
  (detach)="hideOverlay()">
  <app-overlay [data]="{msg: 'Your data'}" [connectedOverlay]="connectedOverlay"></app-overlay>
</ng-template>
...
```

In the overlay component, add a button to close:
```html
<div class="overlay-container">
  <p>This is the injected data: {{ data.data }}</p>
  <div>
    <button mat-raised-button (click)="close()">Close me!</button>
  </div>
</div>
```

And the associated controller:
```typescript
export class OverlayComponent {
...
@Input() connectedOverlay: CdkConnectedOverlay;
...
public close(): void {
  this.connectedOverlay.overlayRef.detach();
}
...
```
