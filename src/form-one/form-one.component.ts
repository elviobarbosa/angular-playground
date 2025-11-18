import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
Validators,
} from '@angular/forms';
import { BaseAutocompleteComponent } from '../../shared/components/base-autocomplete/base-autocomplete.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-form-one',
  imports: [ReactiveFormsModule, BaseAutocompleteComponent, JsonPipe],
  templateUrl: './form-one.component.html',
  styleUrl: './form-one.component.css',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class FormOneComponent implements OnInit, OnDestroy {
  controlKey = input.required<string>();
  parentContainer = inject(ControlContainer);

  form = new FormGroup({
    personagem: new FormControl(null, Validators.required)
  });
  

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(
      this.controlKey(),
      new FormGroup({
        tipo: new FormControl(''),
      })
    );
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey());
  }

  foo(any: any) {
    console.log(any);
  }

  displayPersonagem(item: any) {
    return item ? `${item.name} | ${item.status}` : '';
  }
  

}
