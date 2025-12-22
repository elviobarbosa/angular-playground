import {
  DestroyRef,
  Directive,
  effect,
  inject,
  input,
  signal,
} from "@angular/core";

import { RickMortyDataSource } from "./rick-morty.service";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import {
  AutocompleteParams,
  RickAndMortyCharacter,
} from "./rick-morty.entities";
import { BaseAutocompleteDirective } from "../../../autocomplete-lib/core/base-autocomplete.directive";
import {
  AUTOCOMPLETE_DATA_SOURCE,
  AUTOCOMPLETE_PARAMS,
} from "../../../autocomplete-lib/core/tokens";

@Directive({
  selector: "[rickAndMortyAutocomplete]",
  standalone: true,
  providers: [
    RickMortyDataSource,
    {
      provide: AUTOCOMPLETE_DATA_SOURCE,
      useClass: RickMortyDataSource,
    },
    {
      provide: AUTOCOMPLETE_PARAMS,
      useFactory: () => signal<AutocompleteParams>({}),
    },
  ],
  exportAs: "rickMortyApi",
})
export class RickMortyDirective extends BaseAutocompleteDirective<RickAndMortyCharacter> {
  private paramsSignal = inject(AUTOCOMPLETE_PARAMS);
  private _destroyRef = inject(DestroyRef);

  status = input<AutocompleteParams["status"]>("alive");

  constructor() {
    super();
    toObservable(this.status)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((statusValue) => {
        const params: AutocompleteParams = {};
        if (statusValue) {
          params.status = statusValue;
        }
        this.paramsSignal.set(params);
      });
  }
}
