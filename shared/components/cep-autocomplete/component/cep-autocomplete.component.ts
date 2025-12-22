import { Component, input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CepAutocompleteDirective } from "../services/cep-autocomplete.directive";
import { CepMaskDirective } from "../services/cep-mask.directive";
import { CepResult } from "../services/cep.entities";
import { JsonPipe } from "@angular/common";

@Component({
  selector: "cep-autocomplete",
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CepAutocompleteDirective,
    CepMaskDirective,
    JsonPipe,
  ],
  templateUrl: "./cep-autocomplete.component.html",
  styleUrl: "./cep-autocomplete.component.css",
})
export class CepAutocompleteComponent {
  control = input<FormControl<any>>(new FormControl());
  onBlurHandler(event: CepResult[]) {
    console.log(event);
  }
}
