import { Directive } from "@angular/core";
import { PixAutocompleteDataSource } from "./pix-autocomplete.service";
import { PixResult } from "./pix-autocomplete.entities";
import { PixKeyInputFormatDirective } from "../../../directives/pix-format-input.directive";
import { BaseAutocompleteDirective } from "../../../autocomplete-lib/core/base-autocomplete.directive";
import { AUTOCOMPLETE_DATA_SOURCE } from "../../../autocomplete-lib/core/tokens";

@Directive({
  selector: "[pixAutocomplete]",
  standalone: true,
  providers: [
    PixAutocompleteDataSource,
    {
      provide: AUTOCOMPLETE_DATA_SOURCE,
      useClass: PixAutocompleteDataSource,
    },
  ],
  hostDirectives: [PixKeyInputFormatDirective],
  exportAs: "pixAutocompleteApi",
})
export class PixAutocompleteDirective extends BaseAutocompleteDirective<PixResult> {}
