import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { AUTOCOMPLETE_PARAMS } from "../../../lib-autocomplete/core/tokens";
import { AutocompleteDataSource } from "../../../lib-autocomplete/core/autocomplete-data-source";
import { RickAndMortyCharacter } from "./select-rick-morty.entities";
import { SelectDataSource } from "../../../lib-select/core/select-data-source";
import { SELECT_PARAMS } from "../../../lib-select/core/tokens";

@Injectable()
export class SelectRickMortyDataSource
  implements SelectDataSource<RickAndMortyCharacter>
{
  private http = inject(HttpClient);
  private params = inject(SELECT_PARAMS);

  load(): Observable<RickAndMortyCharacter[]> {
    const searchParams: Record<string, string> = {};

    Object.entries(this.params()).forEach(([key, value]) => {
      if (value != null) {
        searchParams[key] = String(value);
      }
    });

    return this.http
      .get<any>("https://rickandmortyapi.com/api/character", {
        params: new HttpParams({ fromObject: searchParams }),
      })
      .pipe(
        map((res) => {
          if (res.error) {
            return [];
          }
          return res.results ?? [];
        })
      );
  }
}
