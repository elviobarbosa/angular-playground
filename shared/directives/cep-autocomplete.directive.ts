import { Directive } from "@angular/core";
import {
  AUTOCOMPLETE_DS,
  BaseAutocompleteDirective,
} from "./auto-complete.directive";

@Directive({
  selector: "[cepAutocomplete]",
  standalone: true,
  providers: [
    {
      provide: AUTOCOMPLETE_DS,
      useClass: CepAutocompleteService,
    },
  ],
  exportAs: "cepAuto",
})
export class CepAutocompleteDirective extends BaseAutocompleteDirective<CepResult> {}
