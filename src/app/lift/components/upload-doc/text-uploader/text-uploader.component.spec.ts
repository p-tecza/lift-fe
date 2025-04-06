import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextUploaderComponent } from './text-uploader.component';

describe('TextUploaderComponent', () => {
  let component: TextUploaderComponent;
  let fixture: ComponentFixture<TextUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextUploaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
