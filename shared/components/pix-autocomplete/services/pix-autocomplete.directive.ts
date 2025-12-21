import { Directive } from "@angular/core";
import { BaseAutocompleteDirective } from "../../../directives/base-auto-complete/base-auto-complete.directive";
import { PixAutocompleteDataSource } from "./pix-autocomplete.service";
import { AUTOCOMPLETE_DS } from "../../../directives/base-auto-complete/base-auto-complete.entities";

import { PixResult } from "./pix-autocomplete.entities";
import { PixKeyInputFormatDirective } from "../../../directives/pix-format-input.directive";

@Directive({
  selector: "[pixAutocomplete]",
  standalone: true,
  providers: [
    PixAutocompleteDataSource,
    {
      provide: AUTOCOMPLETE_DS,
      useClass: PixAutocompleteDataSource,
    },
  ],
  hostDirectives: [PixKeyInputFormatDirective],
  exportAs: "pixAutocompleteApi",
})
export class PixAutocompleteDirective extends BaseAutocompleteDirective<PixResult> {}
