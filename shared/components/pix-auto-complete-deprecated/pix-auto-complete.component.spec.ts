import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixAutoCompleteComponent } from './pix-auto-complete.component';

describe('PixAutoCompleteComponent', () => {
  let component: PixAutoCompleteComponent;
  let fixture: ComponentFixture<PixAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PixAutoCompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PixAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
