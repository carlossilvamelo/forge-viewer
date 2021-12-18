import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgeViewerFrameComponent } from './forge-viewer-frame.component';

describe('ForgeViewerFrameComponent', () => {
  let component: ForgeViewerFrameComponent;
  let fixture: ComponentFixture<ForgeViewerFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgeViewerFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgeViewerFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
