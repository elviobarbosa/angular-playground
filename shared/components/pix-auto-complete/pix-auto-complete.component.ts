import { Component, input, output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BaseAutocompleteDirective } from "../../directives/auto-complete.directive";
import { JsonPipe } from "@angular/common";
import { PixKeyFormatPipe } from "../../pipes/pix-key-format.pipe";
import { PixKeyInputFormatDirective } from "../../directives/pix-format-input.directive";

@Component({
  selector: "pix-auto-complete",
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    BaseAutocompleteDirective,
    ReactiveFormsModule,
    PixKeyFormatPipe,
    PixKeyInputFormatDirective,
  ],
  templateUrl: "./pix-auto-complete.component.html",
  styleUrl: "./pix-auto-complete.component.css",
})
export class PixAutoCompleteComponent {
  endpoint = "api/pix/search/";
  displayKey = input<string>("label");
  subDisplayKey = input<string>("");
  params = input<Record<string, any>>();
  optionSelected = output<any>();
  control = input<FormControl<any>>(new FormControl());

  private _pixKeyPipe = new PixKeyFormatPipe();

  formatPixKeyDisplay = (item: any): string => {
    if (!item) return "";

    const key = item.key;
    const formattedKey = this._pixKeyPipe.transform(key, item.type);

    if (item.owner) {
      return `${formattedKey} - ${item.owner}`;
    }

    return formattedKey;
  };
}
