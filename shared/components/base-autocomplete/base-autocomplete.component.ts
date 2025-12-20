import { Component, input, output, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BaseAutocompleteDirective } from "../../directives/base-auto-complete/base-auto-complete.directive";
import { JsonPipe } from "@angular/common";

import { HttpParams } from "@angular/common/http";

@Component({
  selector: "base-autocomplete",
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./base-autocomplete.component.html",
  styleUrl: "./base-autocomplete.component.css",
})
export class BaseAutocompleteComponent {
  label = input<string>("");
  placeholder = input<string>("");
  endpoint = signal<string>("");

  displayKey = input<string>("label");
  subDisplayKey = input<string>("");

  optionSelected = output<any>();

  control = input<FormControl<any>>(new FormControl());

  setEndpoint(value: string) {
    const params = new HttpParams().set("name", value);
    this.endpoint.set(
      `https://rickandmortyapi.com/api/character/?${params.toString()}`
    );
  }

  formatDisplay = (item: any): string => {
    if (!item) return "";

    if (item.name) {
      return `${item.name} - ${item.species}`;
    }

    return "";
  };
}
