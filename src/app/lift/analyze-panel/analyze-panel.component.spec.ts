import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzePanelComponent } from './analyze-panel.component';

describe('AnalyzePanelComponent', () => {
  let component: AnalyzePanelComponent;
  let fixture: ComponentFixture<AnalyzePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyzePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyzePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
