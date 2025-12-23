import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { PixResult } from "./pix-autocomplete.entities";
import { AutocompleteDataSource } from "../../../lib-autocomplete/core/autocomplete-data-source";

@Injectable()
export class PixAutocompleteDataSource
  implements AutocompleteDataSource<PixResult>
{
  private http = inject(HttpClient);

  search(term: string) {
    return this.http
      .get<any>(`api/pix/search/${term}`)
      .pipe(map((res) => res ?? []));
  }
}
