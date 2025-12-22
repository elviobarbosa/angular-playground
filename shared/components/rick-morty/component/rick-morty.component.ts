import { Component, input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RickMortyDirective } from "../services/rick-morty.directive";
import { AutocompleteHintComponent } from "../../../autocomplete-lib/shell/autocomplete-hint.component";

@Component({
  selector: "rick-morty-autocomplete",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RickMortyDirective,
    MatInputModule,
    MatAutocompleteModule,
    AutocompleteHintComponent,
  ],
  templateUrl: "./rick-morty.component.html",
})
export class RickMortyAutocompleteComponent {
  control = input(new FormControl());

  displayCharacter = (item: any): string =>
    item ? `${item.name} — ${item.species}` : "";
}
