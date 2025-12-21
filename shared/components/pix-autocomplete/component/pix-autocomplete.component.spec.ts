import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixAutocompleteComponent } from './pix-autocomplete.component';

describe('PixAutocompleteComponent', () => {
  let component: PixAutocompleteComponent;
  let fixture: ComponentFixture<PixAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PixAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PixAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
