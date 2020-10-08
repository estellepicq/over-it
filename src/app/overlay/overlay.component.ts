import { Component, Input } from '@angular/core';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent {

  @Input() data: { msg: string };
  @Input() connectedOverlay: CdkConnectedOverlay;

  constructor(
  ) { }

  public close(): void {
    this.connectedOverlay.overlayRef.detach();
  }

}
