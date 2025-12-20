import { Directive } from "@angular/core";
import { BaseAutocompleteDirective } from "../../../directives/base-auto-complete/base-auto-complete.directive";
import { CepAutocompleteDataSource } from "./cep.service";
import { CepResult } from "./cep.entities";
import { AUTOCOMPLETE_DS } from "../../../directives/base-auto-complete/base-auto-complete.entities";

@Directive({
  selector: "[cepAutocomplete]",
  standalone: true,
  providers: [
    {
      provide: AUTOCOMPLETE_DS,
      useClass: CepAutocompleteDataSource,
    },
  ],
  exportAs: "cepAuto",
})
export class CepAutocompleteDirective extends BaseAutocompleteDirective<CepResult> {}
