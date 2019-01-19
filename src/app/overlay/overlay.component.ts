import { Component, Inject } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { CONTAINER_DATA } from '../tokens';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent {

  constructor(
    @Inject(CONTAINER_DATA) public data: any,
    public overlayRef: OverlayRef
  ) { }

  close() {
    this.overlayRef.detach();
  }

}
