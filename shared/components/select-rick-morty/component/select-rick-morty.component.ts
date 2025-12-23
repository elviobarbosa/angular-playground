import { Component, input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RickMortySelectDirective } from "../services/select-rick-morty.directive";
import { AutocompleteHintComponent } from "../../../lib-autocomplete/shell/autocomplete-hint.component";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { SelectLoadingComponent } from "../../../lib-select/shell/select-loading.component";

@Component({
  selector: "select-rick-morty",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RickMortySelectDirective,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule,
    SelectLoadingComponent,
  ],
  templateUrl: "./select-rick-morty.component.html",
})
export class SelectRickMortyComponent {
  control = input(new FormControl());
  statusFilter = input<"alive" | "dead" | "unknown">("alive");
  speciesFilter = input<string>();
}
