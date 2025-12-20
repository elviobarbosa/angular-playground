import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

export const AUTOCOMPLETE_DS = new InjectionToken<AutocompleteDataSource<any>>(
  "AUTOCOMPLETE_DATA_SOURCE"
);

export interface AutocompleteDataSource<T> {
  search(term: string): Observable<T[]>;
}
