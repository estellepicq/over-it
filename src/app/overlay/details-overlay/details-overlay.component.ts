import { Component, OnInit } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-details-overlay',
  templateUrl: './details-overlay.component.html',
  styleUrls: ['./details-overlay.component.css']
})
export class DetailsOverlayComponent implements OnInit {

  constructor(
    public overlayRef: OverlayRef
    ) { }

  ngOnInit() {
  }

  detachOverlay() {
    this.overlayRef.detach();
  }

}
