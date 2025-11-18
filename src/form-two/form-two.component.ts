import { Component, input, inject, OnInit, OnDestroy } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-form-two',
  imports: [ReactiveFormsModule],
  templateUrl: './form-two.component.html',
  styleUrl: './form-two.component.css',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class FormTwoComponent implements OnInit, OnDestroy {
  controlKey = input.required<string>();
  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(
      this.controlKey(),
      new FormGroup({
        zipCode: new FormControl(''),
        street: new FormControl(''),
      })
    );

    const formOne = this.parentFormGroup.get('tipoPessoa');
    if (formOne instanceof FormGroup) {
      const valor = formOne.get('tipo')?.valueChanges.subscribe((val) => {
        console.log('formOne.valor:', val);
      });
    }
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey());
  }
}
