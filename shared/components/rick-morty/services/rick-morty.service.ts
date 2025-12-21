import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import {
  AUTOCOMPLETE_PARAMS,
  RickAndMortyCharacter,
} from "./rick-morty.entities";
import { AutocompleteDataSource } from "../../../directives/base-auto-complete/base-auto-complete.entities";

@Injectable()
export class RickMortyDataSource
  implements AutocompleteDataSource<RickAndMortyCharacter>
{
  private http = inject(HttpClient);
  private params = inject(AUTOCOMPLETE_PARAMS, { optional: true });

  search(term: string) {
    const searchParams: Record<string, string> = { name: term };

    if (this.params) {
      Object.entries(this.params()).forEach(([key, value]) => {
        if (value != null) {
          searchParams[key] = String(value);
        }
      });
    }

    return this.http
      .get<any>("https://rickandmortyapi.com/api/character", {
        params: new HttpParams({ fromObject: searchParams }),
      })
      .pipe(map((res) => res.results ?? []));
  }
}
