import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseAutocompleteDirective } from '../../directives/auto-complete.directive';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'base-autocomplete',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    BaseAutocompleteDirective,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './base-autocomplete.component.html',
  styleUrl: './base-autocomplete.component.css',
})
export class BaseAutocompleteComponent {
  label = input<string>('');
  placeholder = input<string>('');
  endpoint = input<string>('');

  displayKey = input<string>('label');
  subDisplayKey = input<string>('');

  params = input<Record<string, any>>();

  optionSelected = output<any>();

  control = input<FormControl<any>>();
}
