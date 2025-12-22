import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { RickAndMortyCharacter } from "./rick-morty.entities";
import { AUTOCOMPLETE_PARAMS } from "../../../autocomplete-lib/core/tokens";
import { AutocompleteDataSource } from "../../../autocomplete-lib/core/autocomplete-data-source";

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
      .pipe(
        map((res) => {
          if (res.error) {
            return [];
          }
          return res.results ?? [];
        }),
        catchError((err) => {
          console.error("Erro na requisição:", err);
          return of([]);
        })
      );
  }
}
