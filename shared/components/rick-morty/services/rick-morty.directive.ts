import {
  DestroyRef,
  Directive,
  effect,
  inject,
  input,
  signal,
} from "@angular/core";
import { BaseAutocompleteDirective } from "../../../directives/base-auto-complete/base-auto-complete.directive";
import { RickMortyDataSource } from "./rick-morty.service";
import { AUTOCOMPLETE_DS } from "../../../directives/base-auto-complete/base-auto-complete.entities";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import {
  AUTOCOMPLETE_PARAMS,
  AutocompleteParams,
  RickAndMortyCharacter,
} from "./rick-morty.entities";

@Directive({
  selector: "[rickAndMortyAutocomplete]",
  standalone: true,
  providers: [
    RickMortyDataSource,
    {
      provide: AUTOCOMPLETE_DS,
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
  private destroyRef = inject(DestroyRef);

  status = input<AutocompleteParams["status"]>("alive");

  constructor() {
    super();
    toObservable(this.status)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((statusValue) => {
        const params: AutocompleteParams = {};
        if (statusValue) {
          params.status = statusValue;
        }
        this.paramsSignal.set(params);
      });
  }
}
