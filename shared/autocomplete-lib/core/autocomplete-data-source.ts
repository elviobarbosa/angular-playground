import { Observable } from "rxjs";

export interface AutocompleteDataSource<T> {
  search(term: string): Observable<T[]>;
}
