import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAutocompleteComponent } from './base-autocomplete.component';

describe('BaseAutocompleteComponent', () => {
  let component: BaseAutocompleteComponent;
  let fixture: ComponentFixture<BaseAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
