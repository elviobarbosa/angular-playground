import { Component, input, output, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BaseAutocompleteDirective } from "../../directives/auto-complete.directive";
import { CepInputFormatDirective } from "../../directives/cep-format.directive";
import { CepAutocompleteDirective } from "../../directives/cep-autocomplete.directive";

@Component({
  selector: "cep-autocomplete",
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CepAutocompleteDirective,
  ],
  templateUrl: "./cep-autocomplete.component.html",
  styleUrl: "./cep-autocomplete.component.css",
})
export class CepAutocompleteComponent {
  endpoint = signal<string>("");
  optionSelected = output<any>();
  control = input<FormControl<any>>(new FormControl());

  setEndpoint(value: string) {
    const cep = value.replace(/\D/g, "");
    this.endpoint.set(`https://viacep.com.br/ws/${cep}/json`);
  }

  formatPixKeyDisplay = (item: any): string => {
    return item?.cep || "";
  };
}
