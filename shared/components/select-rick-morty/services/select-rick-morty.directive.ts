import {
  DestroyRef,
  Directive,
  effect,
  inject,
  input,
  signal,
} from "@angular/core";

import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";

import { BaseAutocompleteDirective } from "../../../lib-autocomplete/core/base-autocomplete.directive";
import {
  AUTOCOMPLETE_DATA_SOURCE,
  AUTOCOMPLETE_PARAMS,
} from "../../../lib-autocomplete/core/tokens";
import { BaseSelectDirective } from "../../../lib-select/core/base-select.directive";
import {
  SELECT_DATA_SOURCE,
  SELECT_PARAMS,
} from "../../../lib-select/core/tokens";
import { SelectRickMortyDataSource } from "./select-rick-morty.service";
import { Params, RickAndMortyCharacter } from "./select-rick-morty.entities";
import { combineLatest, debounceTime, map, tap } from "rxjs";

@Directive({
  selector: "[rickAndMortySelect]",
  standalone: true,
  providers: [
    SelectRickMortyDataSource,
    {
      provide: SELECT_DATA_SOURCE,
      useClass: SelectRickMortyDataSource,
    },
    {
      provide: SELECT_PARAMS,
      useFactory: () => signal<Params>({}),
    },
  ],
  exportAs: "selectRickMortyApi",
})
export class RickMortySelectDirective extends BaseSelectDirective<RickAndMortyCharacter> {
  private paramsSignal = inject(SELECT_PARAMS);

  status = input<Params["status"]>();
  species = input<string>();
  gender = input<Params["gender"]>();
  genderSignal = signal<Params["gender"]>("male");
  constructor() {
    super();

    setTimeout(() => {
      this.genderSignal.set("female");
    }, 1000);
    combineLatest([
      toObservable(this.status),
      toObservable(this.species),
      toObservable(this.genderSignal),
    ])
      .pipe(
        map(([status, species, gender]) => {
          const params: Params = {};
          if (status) params.status = status;
          if (species) params.species = species;
          if (this.genderSignal()) params.gender = this.genderSignal();
          return params;
        }),
        tap((params) => this.paramsSignal.set(params)),
        debounceTime(100),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.reload();
      });
  }
}
