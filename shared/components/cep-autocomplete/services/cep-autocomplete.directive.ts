import { Directive } from "@angular/core";
import { CepAutocompleteDataSource } from "./cep.service";
import { CepResult } from "./cep.entities";

import { CepMaskDirective } from "./cep-mask.directive";
import { AUTOCOMPLETE_DATA_SOURCE } from "../../../lib-autocomplete/core/tokens";
import { BaseAutocompleteDirective } from "../../../lib-autocomplete/core/base-autocomplete.directive";

@Directive({
  selector: "[cepAutocomplete]",
  standalone: true,
  providers: [
    {
      provide: AUTOCOMPLETE_DATA_SOURCE,
      useClass: CepAutocompleteDataSource,
    },
  ],
  hostDirectives: [CepMaskDirective],
  exportAs: "cepAuto",
})
export class CepAutocompleteDirective extends BaseAutocompleteDirective<CepResult> {}
