import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOverlayComponent } from './details-overlay.component';

describe('DetailsOverlayComponent', () => {
  let component: DetailsOverlayComponent;
  let fixture: ComponentFixture<DetailsOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
