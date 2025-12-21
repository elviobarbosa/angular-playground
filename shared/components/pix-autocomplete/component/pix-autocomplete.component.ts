import { Component, input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { PixAutocompleteDirective } from "../services/pix-autocomplete.directive";
import { PixResult } from "../services/pix-autocomplete.entities";
import { PixKeyFormatPipe } from "../../../pipes/pix-key-format.pipe";

@Component({
  selector: "pix-autocomplete",
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    PixAutocompleteDirective,
    PixKeyFormatPipe,
  ],
  templateUrl: "./pix-autocomplete.component.html",
  styleUrl: "./pix-autocomplete.component.css",
})
export class PixAutocompleteComponent {
  control = input<FormControl<any>>(new FormControl());
  private _pixKeyPipe = new PixKeyFormatPipe();
  onSelect(event: MatAutocompleteSelectedEvent) {
    const value = event.option.value;

    this.control().setValue(value, { emitEvent: false });
  }

  displayItem = (item: PixResult) => {
    const key = item.key;
    const formattedKey = this._pixKeyPipe.transform(key, item.type);

    if (!item) return "";
    if (typeof item === "string") {
      return item;
    }

    return `${formattedKey} — ${item.owner}`;
  };
}
