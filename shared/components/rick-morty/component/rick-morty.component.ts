import { Component, input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RickMortyDirective } from "../services/rick-morty.directive";

@Component({
  selector: "rick-morty-autocomplete",
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    RickMortyDirective,
  ],
  templateUrl: "./rick-morty.component.html",
  styleUrl: "./rick-morty.component.css",
})
export class RickMortyComponent {
  control = input<FormControl<any>>(new FormControl());
  onSelect(event: MatAutocompleteSelectedEvent) {
    const value = event.option.value;

    this.control().setValue(value, { emitEvent: false });
  }

  displayCharacter = (item: any) => {
    if (!item) return "";
    if (typeof item === "string") {
      return item;
    }

    return `${item.name} — ${item.species}`;
  };
}
